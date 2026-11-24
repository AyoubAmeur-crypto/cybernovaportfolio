function resolveOrigin(request: Request): string {
  const configured = process.env.SITE_URL?.trim().replace(/\/+$/, '');
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured;
  }

  const proto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() || 'https';
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host')?.trim();

  if (host) {
    return `${proto}://${host}`;
  }

  return new URL(request.url).origin;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const origin = resolveOrigin(request);
    const lastmod = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  },
};

