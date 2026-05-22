import transporter from "../config/nodemailer";
import { env } from "../config/env";

type data = {
  fullName: string;
  email: string;
  message: string;
};

export async function sendEmail(data: data) {
  const html = `
  <div style="margin:0;padding:40px 20px;background:#f4f7fb;font-family:Arial,sans-serif;">
    <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 8px 24px rgba(0,0,0,0.06);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#18181b,#3f3f46);padding:32px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;">
          📩 New Portfolio Message
        </h1>
        <p style="margin-top:10px;color:#d4d4d8;font-size:14px;">
          Someone contacted you through your portfolio website
        </p>
      </div>

      <!-- Content -->
      <div style="padding:32px;">

        <div style="margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;color:#71717a;text-transform:uppercase;font-weight:bold;">
            Sender Name
          </p>

          <div style="padding:14px 16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;color:#18181b;font-size:15px;">
            ${data.fullName}
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;color:#71717a;text-transform:uppercase;font-weight:bold;">
            Sender Email
          </p>

          <div style="padding:14px 16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;color:#18181b;font-size:15px;">
            <a href="mailto:${data.email}" style="color:#2563eb;text-decoration:none;">
              ${data.email}
            </a>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:13px;color:#71717a;text-transform:uppercase;font-weight:bold;">
            Message
          </p>

          <div style="padding:18px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;color:#18181b;font-size:15px;line-height:1.8;white-space:pre-wrap;">
${data.message}
          </div>
        </div>

        <!-- Button -->
        <div style="margin-top:32px;text-align:center;">
          <a
            href="mailto:${data.email}"
            style="
              display:inline-block;
              padding:14px 24px;
              background:#18181b;
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              font-weight:bold;
              font-size:14px;
            "
          >
            Reply to Sender
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:20px;text-align:center;border-top:1px solid #e5e7eb;background:#fafafa;">
        <p style="margin:0;color:#71717a;font-size:13px;">
          © ${new Date().getFullYear()} Muhammad Isa Portfolio
        </p>
      </div>
    </div>
  </div>
  `;

  await transporter!.sendMail({
    from: env.MAIL_FROM,
    to: "muhammadisa226@gmail.com",
    subject: `📩 New Message from ${data.fullName}`,
    html,
  });
}
