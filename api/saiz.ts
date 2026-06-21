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

    const url = new URL(request.url);
    const brandCode = url.searchParams.get('brandCode');
    const productCode = url.searchParams.get('productCode');

    if (!brandCode || !productCode) {
      return Response.json(
        { message: 'brandCode and productCode are required.' },
        { status: 400 },
      );
    }

    const upstreamUrl =
      `${SAIZ_BASE_URL}/api/Product/GetProductForWidget/` +
      `${encodeURIComponent(brandCode)}/${encodeURIComponent(productCode)}`;

    try {
      const response = await fetch(upstreamUrl, {
        headers: {
          Accept: 'application/json',
          'SAIZ-API-KEY': apiKey,
        },
      });

      const body = await response.text();

      return new Response(body, {
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
