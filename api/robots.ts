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
    const body = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      `Sitemap: ${origin}/sitemap.xml`,
      '',
    ].join('\n');

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  },
};

