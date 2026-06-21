import { createRoot } from 'react-dom/client';
import widgetCss from './ui/styles.css?inline';
import { readWidgetConfig } from './bootstrap/readConfig';
import type { WidgetConfig } from './bootstrap/types';
import { HttpProductService } from './data/services/HttpProductService';
import { createStore } from './store/store';
import { Widget } from './ui/Widget';

const CONTAINER_ID = 'saiz-widget-container';
const STYLE_ID = 'saiz-widget-styles';
const FONT_ID = 'saiz-widget-font';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap';

const injectOnce = (id: string, make: () => HTMLElement) => {
  if (document.getElementById(id)) return;
  document.head.appendChild(make());
};

const injectStyles = () =>
  injectOnce(STYLE_ID, () => {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = widgetCss;
    return style;
  });

const injectFont = () =>
  injectOnce(FONT_ID, () => {
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    return link;
  });

const mount = () => {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return;

  let config: WidgetConfig;
  try {
    config = readWidgetConfig(container);
  } catch (err) {
    console.error(err);
    return;
  }

  injectFont();
  injectStyles();

  const productService = new HttpProductService();
  const store = createStore({ productService });

  createRoot(container).render(
      <Widget store={store} config={config} />
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
