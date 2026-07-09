// backend/emailService.js
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000
})

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email service ready to send emails');
  }
});

// Send email function
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Circus of Wonders" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent
    }

    const result = await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent to ${to}: ${result.messageId}`)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('❌ Email failed:', error.message)
    return { success: false, error: error.message }
  }
}

// Complaint status update email template
export const sendComplaintStatusEmail = async (user, complaint, oldStatus, newStatus) => {
  let subject = ''
  let htmlContent = ''

  const baseHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F5F5DC; border: 3px solid #FFD700; border-radius: 20px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2F1B0A, #8B4513); padding: 30px; text-align: center;">
        <div style="font-size: 50px;">🎪</div>
        <h1 style="color: #FFD700; margin: 10px 0 0; font-size: 24px; text-transform: uppercase;">Circus of Wonders</h1>
        <p style="color: rgba(255,215,0,0.7); margin: 5px 0 0;">Grievance Tracker</p>
      </div>
      <div style="padding: 30px;">
  `

  const footerHtml = `
      </div>
      <div style="background: #2F1B0A; padding: 15px; text-align: center;">
        <p style="color: #FFD700; margin: 0; font-size: 12px;">&copy; Circus of Wonders - Keeping the show running smoothly</p>
      </div>
    </div>
  `

  if (newStatus === 'in-progress') {
    subject = `🔄 Complaint In Progress: ${complaint.title}`
    htmlContent = baseHtml + `
      <h2 style="color: #8B4513; margin-top: 0;">🔄 Status Update</h2>
      <p style="color: #333; line-height: 1.6;">Dear <strong>${user.username}</strong>,</p>
      <p style="color: #333; line-height: 1.6;">Your complaint <strong>"${complaint.title}"</strong> is now <strong style="color: #D2691E;">IN PROGRESS</strong>.</p>
      <div style="background: #F0F0F0; padding: 15px; border-radius: 10px; margin: 20px 0;">
        <p style="margin: 0; color: #555;">"Our team is actively working on your issue. You'll be notified once it's resolved."</p>
      </div>
      <p style="color: #333; line-height: 1.6;">Thank you for your patience!</p>
    ` + footerHtml
  } 
  else if (newStatus === 'resolved') {
    subject = `✅ Complaint Resolved: ${complaint.title}`
    htmlContent = baseHtml + `
      <h2 style="color: #8B4513; margin-top: 0;">✅ Complaint Resolved</h2>
      <p style="color: #333; line-height: 1.6;">Dear <strong>${user.username}</strong>,</p>
      <p style="color: #333; line-height: 1.6;">Great news! Your complaint <strong>"${complaint.title}"</strong> has been <strong style="color: green;">RESOLVED</strong>.</p>
      <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4CAF50;">
        <p style="margin: 0; color: #2e7d32;">✓ Issue has been fixed by our team</p>
        <p style="margin: 5px 0 0; color: #2e7d32;">✓ Thank you for helping improve the circus</p>
      </div>
      <p style="color: #333; line-height: 1.6;">We appreciate your feedback!</p>
    ` + footerHtml
  } 
  else {
    subject = `📋 Complaint Update: ${complaint.title}`
    htmlContent = baseHtml + `
      <h2 style="color: #8B4513; margin-top: 0;">📋 Status Update</h2>
      <p style="color: #333; line-height: 1.6;">Dear <strong>${user.username}</strong>,</p>
      <p style="color: #333; line-height: 1.6;">Your complaint <strong>"${complaint.title}"</strong> status has been updated from <strong>${oldStatus}</strong> to <strong style="color: #D2691E;">${newStatus}</strong>.</p>
      <p style="color: #333; line-height: 1.6;">You can track the progress in your dashboard.</p>
    ` + footerHtml
  }

  return await sendEmail(user.email, subject, htmlContent)
}