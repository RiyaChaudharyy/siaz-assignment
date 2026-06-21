const SAIZ_BASE_URL = 'https://staging-saiz-app.com';

export async function GET(request: Request) {
  const apiKey = process.env.SAIZ_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: 'SAIZ_API_KEY is missing.' },
      { status: 500 },
    );
  }

  const pathParts = new URL(request.url).pathname
    .split('/')
    .filter(Boolean);

  const brandCode = pathParts[pathParts.length - 2];
  const productCode = pathParts[pathParts.length - 1];

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
}
