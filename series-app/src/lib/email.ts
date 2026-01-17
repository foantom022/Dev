import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"SeriesHub" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || '',
      html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #9333ea 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; }
        .content { padding: 30px; background: #f9fafb; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎬 SeriesHub</h1>
        </div>
        <div class="content">
          <h2>ยืนยันอีเมลของคุณ</h2>
          <p>ขอบคุณที่สมัครสมาชิก SeriesHub! กรุณากดปุ่มด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
          <a href="${verificationUrl}" class="button">ยืนยันอีเมล</a>
          <p>หรือคัดลอกลิงก์นี้ไปวางในเบราว์เซอร์:</p>
          <p style="word-break: break-all; color: #6b7280;">${verificationUrl}</p>
          <p style="margin-top: 30px; color: #6b7280;">ลิงก์นี้จะหมดอายุใน 24 ชั่วโมง</p>
        </div>
        <div class="footer">
          <p>หากคุณไม่ได้สมัครสมาชิก กรุณาละเว้นอีเมลนี้</p>
          <p>&copy; 2024 SeriesHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'ยืนยันอีเมลของคุณ - SeriesHub',
    html,
    text: `กรุณายืนยันอีเมลของคุณโดยเข้าไปที่: ${verificationUrl}`,
  });
}

export async function sendWelcomeEmail(email: string, name: string | null) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #9333ea 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; }
        .content { padding: 30px; background: #f9fafb; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎬 ยินดีต้อนรับสู่ SeriesHub!</h1>
        </div>
        <div class="content">
          <h2>สวัสดี ${name || 'คุณ'}!</h2>
          <p>ขอบคุณที่เข้าร่วมกับเรา คุณพร้อมที่จะเริ่มดูซีรี่ย์โปรดของคุณแล้ว!</p>
          <h3>สิ่งที่คุณสามารถทำได้:</h3>
          <ul>
            <li>🎥 ดูซีรี่ย์หลายพันตอน</li>
            <li>⭐ ให้คะแนนและรีวิวซีรี่ย์ที่คุณชอบ</li>
            <li>📋 สร้าง Watchlist ส่วนตัว</li>
            <li>🔔 รับการแจ้งเตือนตอนใหม่</li>
            <li>🎯 รับคำแนะนำที่เหมาะกับคุณ</li>
          </ul>
          <a href="${process.env.NEXTAUTH_URL}" class="button">เริ่มดูเลย!</a>
        </div>
        <div class="footer">
          <p>&copy; 2024 SeriesHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'ยินดีต้อนรับสู่ SeriesHub! 🎬',
    html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #9333ea 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; }
        .content { padding: 30px; background: #f9fafb; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 รีเซ็ตรหัสผ่าน</h1>
        </div>
        <div class="content">
          <h2>คำขอรีเซ็ตรหัสผ่าน</h2>
          <p>เราได้รับคำขอให้รีเซ็ตรหัสผ่านของคุณ กรุณากดปุ่มด้านล่างเพื่อสร้างรหัสผ่านใหม่:</p>
          <a href="${resetUrl}" class="button">รีเซ็ตรหัสผ่าน</a>
          <p>หรือคัดลอกลิงก์นี้ไปวางในเบราว์เซอร์:</p>
          <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
          <p style="margin-top: 30px; color: #6b7280;">ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
        </div>
        <div class="footer">
          <p>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาละเว้นอีเมลนี้</p>
          <p>&copy; 2024 SeriesHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'รีเซ็ตรหัสผ่าน - SeriesHub',
    html,
    text: `กรุณารีเซ็ตรหัสผ่านของคุณโดยเข้าไปที่: ${resetUrl}`,
  });
}
