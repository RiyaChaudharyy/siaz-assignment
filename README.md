# SAIZ size recommender widget

An embeddable widget for a product page. It drops into a container, reads the
product details from the container's `data-*` attributes, calls the SAIZ API,
and — if the product is active — opens a modal with the screens below:

1. **Selector** – the shopper picks units (cm/in), gender, age, weight, height.
2. **Recommendation** – shows the recommended size, a fit message, the body
   figure with chest/waist fit badges, and the shop CTA.
3. **How it works** – an info screen reached from the `i` icon on the selector,
   explaining what the inputs are used for.

If the product is not active (or the call fails) it shows a small message inside
the container instead of opening the modal.

Stack: React 18 + TypeScript + Redux Toolkit + Vite. It builds to one
self-mounting JS file with its own scoped styles, so a host page needs a single
`<script>` tag.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/saiz-widget.js
npm run typecheck
```

The widget calls the real API only — there is no mock data. Copy `.env.example`
to `.env.local` and add the key before running:

```
VITE_SAIZ_API_KEY=your-key
VITE_SAIZ_BASE_URL=          # leave empty in dev to use the proxy and avoid CORS
```

It calls `GET {baseUrl}/api/Product/GetProductForWidget/{brandCode}/{productCode}`
with a `SAIZ-API-KEY` header. In dev, leaving the base URL empty routes requests
through the Vite proxy in `vite.config.ts` so the browser doesn't hit CORS. If
the call fails or returns an inactive product, the widget shows the inline
"unavailable" message instead of the modal.

Embedding on a page:

```html
<div id="saiz-widget-container"
     data-brandcode="ohapril"
     data-productcode="zahara-lace-longsleeve-black"
     data-visitorid="..."
     data-language="en-us"></div>
<script src="saiz-widget.js"></script>
```

---

## Folder structure

```
src/
  bootstrap/    reads the container's data-* attributes into a config object
  data/         talks to the API
    dto/          the raw API response shape
    services/     HttpProductService: fetches + delegates mapping
    mappers/      productMapper: API response -> our Product model
  domain/       app logic, independent of React and the API
    models/       Product, Measurements, Recommendation (plain types)
    ports/        ProductService interface (the contract the service implements)
    services/     recommendationEngine: picks the size from the measurements
  store/        Redux Toolkit
    slices/       product, navigation (current screen), measurements, theme
  theme/        ModelContext + brand palettes -> CSS variables
  brands/       factory that returns the screen set for a brand
    default/      SelectorScreen + InfoScreen + RecommendationScreen
  ui/           Modal, Widget, shared components, styles.css
  main.tsx      entry: find container, read config, build store, render
```

---

## How it flows

```mermaid
flowchart TD
    A[main.tsx mounts] --> B[readConfig: data-* -> config]
    B --> C[createStore with HttpProductService]
    C --> D[Widget renders]
    D --> E[dispatch fetchProduct]
    E --> F[HttpProductService.getProduct -> fetch]
    F --> G[productMapper: API DTO -> Product]
    G --> H[productSlice stores it]
    H --> I{isActive?}
    I -- no --> J[InactiveMessage in container]
    I -- yes --> K[Modal opens]
    K --> L[screenFactory by brandCode]
    L --> M[SelectorScreen]
    M -- i icon --> N[InfoScreen]
    N -- Get recommendation --> P[RecommendationScreen]
    M -- Get recommendation --> P
    P --> Q[recommendationEngine.recommend]
    Q --> R[size + fit badges + message]
    S[ThemeSwitch -> themeSlice] --> T[ModelContext sets CSS vars]
```

Work Flow:

```
main.tsx
  -> readConfig()            read data-* attributes into a config object
  -> createStore()           inject HttpProductService
  -> <Widget>
       -> fetchProduct()     thunk calls HttpProductService.getProduct()
            -> fetch the API, then productMapper turns the response into Product
       -> productSlice        status = active | inactive | error
       -> not active -> <InactiveMessage>
       -> active     -> <Modal>
            -> screenFactory(brandCode) -> { Selector, Info, Recommendation }
            -> <SelectorScreen>          reads + updates the measurements slice
                 -> i icon            -> <InfoScreen> ("How it works")
                 -> Get recommendation -> <RecommendationScreen>
                      -> recommendationEngine.recommend(measurements, product)
                      -> size, message, chest/waist fit badges

Theme (separate, always available):
  ThemeSwitch -> themeSlice.toggleMode
             -> ModelContext resolves the brand palette for the mode
             -> writes --saiz-* CSS variables on the widget root
```

Navigation lives in `navigationSlice`. `selector` and `recommendation` are the
linear flow (the progress bar reads 50% then 100%); `info` is a branch reached
from the selector's `i` icon and returns to it with the back arrow.

