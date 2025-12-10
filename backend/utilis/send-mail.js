import { Resend } from "resend";

export async function sendEmail({ to, subject, react, text }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,   // for React email template (optional)
      text,    // fallback if react template is not used
    });

    return { success: true, data };
  } catch (error) {
    console.error(" Failed to send email:", error);
    return { success: false, error };
  }
}
