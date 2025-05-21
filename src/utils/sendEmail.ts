import transporter from "../config/nodemailer";
import { env } from "../config/env";

type data = {
  fullName: string;
  email: string;
  message: string;
};

export async function sendEmail(data: data) {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
        <h2 style="margin-top: 0;">📬 New Contact Message</h2>
        <p><strong>Name Sender:</strong> ${data.fullName}</p>
        <p><strong>Email Sender:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;
  await transporter!.sendMail({
    from: env.MAIL_FROM,
    to: "muhammadisa226@gmail.com",
    subject: "My Portfolio",
    html: html,
  });
}
