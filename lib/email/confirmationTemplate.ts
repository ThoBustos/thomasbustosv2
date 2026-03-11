export function confirmationTemplate(confirmUrl: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #f5f5f5;">
          <p style="margin:0;font-family:Georgia,serif;font-size:1.4rem;font-weight:400;color:#000;">
            AI News
          </p>
          <p style="margin:4px 0 0;font-family:'Helvetica Neue',sans-serif;font-size:0.7rem;letter-spacing:0.08em;color:#d4d4d4;text-transform:uppercase;">
            by Thomas Bustos
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 0;">
          <p style="margin:0 0 16px;font-family:'Helvetica Neue',sans-serif;font-size:0.9rem;color:#000;line-height:1.6;">
            Thanks for subscribing. One click to confirm your email and you're in.
          </p>
          <p style="margin:0 0 32px;font-family:'Helvetica Neue',sans-serif;font-size:0.85rem;color:#666;line-height:1.6;">
            You'll get a daily digest of the most important AI developments, curated from top YouTube channels — delivered straight to your inbox.
          </p>
          <a href="${confirmUrl}"
             style="display:inline-block;padding:12px 28px;background:#7C6AC4;color:#ffffff;text-decoration:none;font-family:'Helvetica Neue',sans-serif;font-size:0.85rem;letter-spacing:0.03em;border-radius:2px;">
            Confirm subscription
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #f5f5f5;">
          <p style="margin:0;font-family:'Helvetica Neue',sans-serif;font-size:0.7rem;color:#d4d4d4;line-height:1.6;">
            If you didn't subscribe, you can safely ignore this email.<br>
            <a href="${unsubscribeUrl}" style="color:#d4d4d4;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
