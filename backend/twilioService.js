import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendSMS = async (to, message) => {
  try {
    let phoneNumber = to
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+91${phoneNumber}` // India default
    }

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })
    
    console.log(`✅ SMS sent: ${result.sid}`)
    return { success: true }
  } catch (error) {
    console.error('❌ SMS failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const sendComplaintStatusSMS = async (user, complaint, oldStatus, newStatus) => {
  let message = ''
  
  if (newStatus === 'in-progress') {
    message = `🎪 Circus of Wonders: Your complaint "${complaint.title}" is now IN PROGRESS. Our team is working on it.`
  } 
  else if (newStatus === 'resolved') {
    message = `🎪 Circus of Wonders: GREAT NEWS! Your complaint "${complaint.title}" has been RESOLVED. Thank you for your patience!`
  } 
  else {
    message = `🎪 Circus of Wonders: Your complaint "${complaint.title}" status changed from ${oldStatus} to ${newStatus}.`
  }
  
  return await sendSMS(user.phone, message)
}