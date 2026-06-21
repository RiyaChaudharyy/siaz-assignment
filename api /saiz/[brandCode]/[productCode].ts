const SAIZ_BASE_URL = 'https://staging-saiz-app.com';

export default {
  async fetch(request: Request) {
    const apiKey = process.env.SAIZ_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: 'SAIZ_API_KEY is missing.' },
        { status: 500 },
      );
    }

    const parts = new URL(request.url).pathname
      .split('/')
      .filter(Boolean);

    const brandCode = parts[parts.length - 2];
    const productCode = parts[parts.length - 1];

    if (!brandCode || !productCode) {
      return Response.json(
        { message: 'brandCode and productCode are required.' },
        { status: 400 },
      );
    }

    const apiUrl =
      `${SAIZ_BASE_URL}/api/Product/GetProductForWidget/` +
      `${encodeURIComponent(brandCode)}/${encodeURIComponent(productCode)}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'SAIZ-API-KEY': apiKey,
        },
      });

      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type':
            response.headers.get('content-type') ?? 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    } catch {
      return Response.json(
        { message: 'Unable to connect to SAIZ API.' },
        { status: 502 },
      );
    }
  },
};
