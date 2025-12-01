const KUA_EMAIL = "kuapecalungan15@gmail.com";

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

/**
 * Send email notification to user
 * This is a placeholder implementation that logs to console
 * In production, integrate with actual email service (SendGrid, AWS SES, etc.)
 */
export async function sendEmail({ to, subject, body }: SendEmailParams): Promise<boolean> {
  try {
    // Log email details for now
    console.log("[Email Notification]");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", body);
    console.log("---");
    
    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({ to, from: KUA_EMAIL, subject, text: body });
    
    return true;
  } catch (error) {
    console.error("[Email Notification] Failed to send email:", error);
    return false;
  }
}

interface QuestionAnsweredEmailParams {
  recipientEmail: string;
  recipientName: string;
  questionText: string;
  answerText: string;
  categoryName: string;
  questionId: number;
}

export async function sendQuestionAnsweredEmail(params: QuestionAnsweredEmailParams): Promise<boolean> {
  const { recipientEmail, recipientName, questionText, answerText, categoryName, questionId } = params;
  
  const subject = `Pertanyaan Fiqih Anda Telah Dijawab - ${categoryName}`;
  
  const body = `
Assalamu'alaikum ${recipientName},

Pertanyaan fiqih Anda telah dijawab oleh ustadz kami.

PERTANYAAN ANDA:
${questionText}

JAWABAN USTADZ:
${answerText}

Anda dapat melihat jawaban lengkap di website kami:
${process.env.VITE_APP_URL || 'https://websitekua.manus.space'}/pertanyaan/${questionId}

Jika Anda memiliki pertanyaan lanjutan, jangan ragu untuk mengajukan pertanyaan baru melalui website kami.

Jazakumullahu khairan,
KUA Kecamatan Pecalungan

---
Email ini dikirim otomatis. Untuk pertanyaan lebih lanjut, hubungi kami di ${KUA_EMAIL}
  `.trim();
  
  return await sendEmail({
    to: recipientEmail,
    subject,
    body,
  });
}
