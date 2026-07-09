// frontend/src/components/Dashboard/CitizenDetails/PaymentPage.jsx
import React, { useState } from 'react'

const PaymentPage = ({ user }) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert('Please enter a valid amount')
      return
    }

    setLoading(true)

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        alert('Failed to load payment gateway. Please try again.')
        setLoading(false)
        return
      }

      // Create order from backend
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            userId: user?.id,
            username: user?.username
          }
        })
      })

      const order = await response.json()

      if (!order.success) {
        alert(order.message || 'Failed to create order')
        setLoading(false)
        return
      }

      // Razorpay options
      const options = {
        key: order.key_id,
        amount: order.order.amount,
        currency: order.order.currency,
        name: 'Circus of Wonders',
        description: `Donation of ₹${amount} to support the circus`,
        order_id: order.order.id,
        handler: function (response) {
          // Payment successful
          setPaymentStatus({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          })
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`)
        },
        prefill: {
          name: user?.username || 'Guest',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#D2691E'
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            alert('Payment cancelled')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
      razorpay.on('payment.failed', function (response) {
        setPaymentStatus({
          success: false,
          error: response.error.description
        })
        alert(`Payment failed: ${response.error.description}`)
      })

    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const suggestedAmounts = [100, 500, 1000, 2000, 5000]

  return (
    <div className="min-h-screen p-12" style={{ background: '#F5F5DC' }}>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-3xl">💰</span>
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
              Support the Circus
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Your contribution keeps the magic alive ✦
            </p>
          </div>
        </div>
        <div className="h-2 rounded-full mt-6" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>

      {/* Payment Success Message */}
      {paymentStatus?.success && (
        <div className="mb-6 p-6 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 text-center">
          <span className="text-3xl block mb-2">✅</span>
          <p className="font-bold text-lg">Payment Successful!</p>
          <p className="text-sm mt-1">Payment ID: {paymentStatus.paymentId}</p>
          <p className="text-sm">Thank you for supporting the Circus of Wonders! 🎪</p>
        </div>
      )}

      {/* Payment Failed Message */}
      {paymentStatus?.success === false && (
        <div className="mb-6 p-6 rounded-2xl border-2 border-red-500 bg-red-50 text-red-700 text-center">
          <span className="text-3xl block mb-2">❌</span>
          <p className="font-bold text-lg">Payment Failed</p>
          <p className="text-sm mt-1">{paymentStatus.error}</p>
          <p className="text-sm">Please try again.</p>
        </div>
      )}

      {/* Main Payment Card */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          
          {/* Card Header */}
          <div className="relative px-10 py-8 overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)' }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'
            }} />
            <div className="relative">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
                style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
                <span className="text-4xl">🎪</span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white"
                style={{ fontFamily: 'Georgia, serif' }}>
                Make a Donation
              </h2>
              <p className="text-sm text-[#FFD700] mt-2">Support the Circus of Wonders</p>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-10 py-10" style={{ background: '#F5F5DC' }}>

            {/* Suggested Amounts */}
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#8B4513' }}>
                ✦ Suggested Amounts ✦
              </p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {suggestedAmounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                      amount === amt.toString()
                        ? 'bg-[#D2691E] text-white border-[#FFD700]'
                        : 'bg-white text-[#8B4513] border-[#D2691E] hover:bg-[#D2691E]/10'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="mb-8">
              <label className="block text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8B4513' }}>
                ✦ Custom Amount ✦
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl font-bold" style={{ color: '#8B4513' }}>₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-5 py-4 rounded-2xl border-2 text-lg font-bold outline-none transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: amount ? '#8B4513' : '#D2691E',
                    color: '#2F1B0A'
                  }}
                />
              </div>
            </div>

            {/* Decorative Stripe */}
            <div className="h-1.5 rounded-full my-8" style={{
              background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
            }} />

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading || !amount}
              className="w-full py-5 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', color: '#FFD700', fontFamily: 'Georgia, serif' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🎠</span> Processing...
                </span>
              ) : (
                <span>💝 Donate Now</span>
              )}
            </button>

            {/* Info Text */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Secure payment powered by Razorpay<br />
              Your donation helps us keep the circus running smoothly
            </p>
          </div>

          {/* Bottom Stripe */}
          <div className="h-2" style={{
            background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
          }} />
        </div>
      </div>
    </div>
  )
}

export default PaymentPage