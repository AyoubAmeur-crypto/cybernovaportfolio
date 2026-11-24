const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      // Signals frontend to use zero-key FormSubmit AJAX delivery
      return Response.json({ ok: false, fallback: 'formsubmit' }, { status: 501 });
    }

    let payload: { email?: unknown; message?: unknown; to?: unknown };
    try {
      payload = (await request.json()) as { email?: unknown; message?: unknown; to?: unknown };
    } catch {
      return Response.json({ ok: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const senderEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (!senderEmail || !EMAIL_REGEX.test(senderEmail) || senderEmail.length > 254) {
      return Response.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
    }

    if (!message || message.length > 5000) {
      return Response.json({ ok: false, error: 'Message must be between 1 and 5000 characters' }, { status: 400 });
    }

    const recipient =
      process.env.CONTACT_TO_EMAIL ||
      (typeof payload.to === 'string' && EMAIL_REGEX.test(payload.to)
        ? payload.to
        : 'Salmaatouofficiel@gmail.com');

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const safeEmail = escapeHtml(senderEmail);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: senderEmail,
        subject: `Portfolio Inquiry from ${senderEmail}`,
        text: `Sender: ${senderEmail}\n\n${message}`,
        html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1A1A2E; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New Portfolio Message</h2>
          <p style="margin: 0 0 16px;"><strong>Reply-To:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="padding: 16px; border-radius: 12px; background: #F8F7FA; border: 1px solid #E5E7EB;">${safeMessage}</div>
        </div>`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => '');
      return Response.json(
        { ok: false, error: 'Upstream email provider error', details: errText.slice(0, 200) },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, provider: 'resend' }, { status: 200 });
  },
};

