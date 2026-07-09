// backend/paymentRoutes.js
import express from 'express'
import Razorpay from 'razorpay'
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Y2wy8t1wD1AFaA',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'zSqRMpIa2ljBBpkieFYGmfLa',
})

// File path for storing orders
const ordersFilePath = path.join(__dirname, 'orders.json')

// Function to read data from JSON file
const readData = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath)
    return JSON.parse(data)
  }
  return []
}

// Function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2))
}

// Initialize orders.json if it doesn't exist
if (!fs.existsSync(ordersFilePath)) {
  writeData([])
}

// ========== CREATE ORDER ==========
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body

    const options = {
      amount: amount * 100, // Convert amount to paise 
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {},
    }

    const order = await razorpay.orders.create(options)

    // Store order in JSON file
    const orders = readData()
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
      notes: notes,
      createdAt: new Date().toISOString(),
    })
    writeData(orders)

    console.log(`✅ Order created: ${order.id}`)

    res.json({
      success: true,
      order: order,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Y2wy8t1wD1AFaA',
    })
  } catch (error) {
    console.error('❌ Error creating order:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    })
  }
})

// ========== VERIFY PAYMENT ==========
router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const secret = razorpay.key_secret
  const body = razorpay_order_id + '|' + razorpay_payment_id

  try {
    // Create expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex')

    const isValidSignature = expectedSignature === razorpay_signature

    if (isValidSignature) {
      // Update the order with payment details
      const orders = readData()
      const orderIndex = orders.findIndex((o) => o.order_id === razorpay_order_id)
      
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'paid'
        orders[orderIndex].payment_id = razorpay_payment_id
        orders[orderIndex].paidAt = new Date().toISOString()
        writeData(orders)
      }

      console.log(`✅ Payment verified: ${razorpay_payment_id}`)
      res.status(200).json({
        success: true,
        status: 'ok',
        message: 'Payment verified successfully',
      })
    } else {
      console.log(`❌ Payment verification failed for: ${razorpay_payment_id}`)
      res.status(400).json({
        success: false,
        status: 'verification_failed',
        message: 'Invalid signature',
      })
    }
  } catch (error) {
    console.error('❌ Error verifying payment:', error)
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Error verifying payment',
    })
  }
})

// ========== GET ORDER STATUS ==========
router.get('/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params
    const orders = readData()
    const order = orders.find((o) => o.order_id === orderId)

    if (order) {
      res.json({
        success: true,
        order: order,
      })
    } else {
      res.json({
        success: false,
        message: 'Order not found',
      })
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
    })
  }
})

// ========== GET ALL ORDERS (Admin) ==========
router.get('/all-orders', async (req, res) => {
  try {
    const orders = readData()
    res.json({
      success: true,
      orders: orders,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    })
  }
})

// ========== FEEDBACK ROUTES ==========
// Store feedback in JSON file
const feedbackFilePath = path.join(__dirname, 'feedback.json')

const readFeedback = () => {
  if (fs.existsSync(feedbackFilePath)) {
    const data = fs.readFileSync(feedbackFilePath)
    return JSON.parse(data)
  }
  return []
}

const writeFeedback = (data) => {
  fs.writeFileSync(feedbackFilePath, JSON.stringify(data, null, 2))
}

if (!fs.existsSync(feedbackFilePath)) {
  writeFeedback([])
}

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const { userId, username, rating, feedback } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      })
    }

    const feedbackData = {
      id: Date.now(),
      userId,
      username,
      rating,
      feedback: feedback || '',
      createdAt: new Date().toISOString(),
    }

    const feedbacks = readFeedback()
    feedbacks.push(feedbackData)
    writeFeedback(feedbacks)

    console.log(`✅ Feedback submitted by ${username}`)

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: feedbackData,
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
    })
  }
})

// Get all feedback (Admin)
router.get('/feedback/all', async (req, res) => {
  try {
    const feedbacks = readFeedback()
    res.json({
      success: true,
      feedbacks: feedbacks.reverse(), // Latest first
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
    })
  }
})

// Get feedback stats (Admin)
router.get('/feedback/stats', async (req, res) => {
  try {
    const feedbacks = readFeedback()
    const totalFeedbacks = feedbacks.length
    const avgRating = totalFeedbacks > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks).toFixed(1)
      : 0

    const ratingDistribution = {
      1: feedbacks.filter(f => f.rating === 1).length,
      2: feedbacks.filter(f => f.rating === 2).length,
      3: feedbacks.filter(f => f.rating === 3).length,
      4: feedbacks.filter(f => f.rating === 4).length,
      5: feedbacks.filter(f => f.rating === 5).length,
    }

    res.json({
      success: true,
      stats: {
        total: totalFeedbacks,
        averageRating: avgRating,
        distribution: ratingDistribution,
      },
    })
  } catch (error) {
    console.error('Error fetching feedback stats:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback stats',
    })
  }
})

export default router