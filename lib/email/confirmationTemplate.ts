const PREHEADER_PADDING = '&#8199;&#65279;&#847;'.repeat(40)

export function confirmationTemplate(confirmUrl: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
</head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;">One click to confirm — you're almost in.${PREHEADER_PADDING}</div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;">
    <tr><td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:2px;">

        <!-- Masthead -->
        <tr><td style="background:#111111;padding:28px 36px;border-radius:2px 2px 0 0;">
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:1.3rem;font-weight:400;color:#ffffff;line-height:1.2;">
            AI News
          </p>
          <p style="margin:5px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.65rem;letter-spacing:0.14em;color:#888888;text-transform:uppercase;">
            by Thomas Bustos
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 36px 28px;">

          <p style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:1.25rem;font-weight:400;color:#111111;line-height:1.3;">
            Confirm your subscription.
          </p>

          <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.9rem;color:#333333;line-height:1.65;">
            Thanks for subscribing to AI News. One click below and you're in.
          </p>
          <p style="margin:0 0 32px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.85rem;color:#555555;line-height:1.65;">
            You'll receive a daily digest of the most important AI developments, curated from the top sources — straight to your inbox.
          </p>

          <a href="${confirmUrl}"
             style="display:inline-block;padding:13px 30px;background:#111111;color:#ffffff;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.85rem;letter-spacing:0.04em;border-radius:2px;">
            Confirm subscription
          </a>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px 28px;border-top:1px solid #ebebeb;">
          <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:0.72rem;color:#666666;line-height:1.65;">
            If you didn't subscribe, you can safely ignore this email.<br>
            <a href="${unsubscribeUrl}" style="color:#666666;text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`
}
