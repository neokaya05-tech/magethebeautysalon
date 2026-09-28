import React, { useState } from 'react'
import './Booking.css'
import { supabase } from '../lib/supabase'
import Modal from '../components/Modal'

export default function Book() {
  const [formData, setFormData] = useState({
    service: 'Bridal Package (Events) - R1200 (180 mins)',
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: '',
  })

  const [sendMethod, setSendMethod] = useState('whatsapp')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Custom Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: ''
  })

  const showAlert = (title, message) => {
    setModalConfig({ isOpen: true, title, message })
  }

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }))
  }

  const SALON_WHATSAPP = '27793615528'
  const SALON_EMAIL = 'neokaya05@gmail.com'
  const todayString = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validate Full Name
    const cleanName = formData.name.trim()
    if (cleanName.length < 2) {
      showAlert('Invalid Name', 'Please enter your full name before proceeding.')
      return
    }

    // 2. Validate South African Phone Number
    const phoneRegex = /^(\+27|0)\d{9}$/
    const cleanedPhone = formData.phone.replace(/\s+/g, '')

    if (!phoneRegex.test(cleanedPhone)) {
      showAlert('Invalid Phone Number', 'Please enter a valid South African phone number (e.g. 082 345 6789 or +27823456789).')
      return
    }

    // 3. Validate Email Format
    const cleanEmail = formData.email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      showAlert('Invalid Email Address', 'Please provide a valid email address.')
      return
    }

    // 4. Validate Date
    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      showAlert('Invalid Date', 'Appointment date cannot be in the past. Please select a valid future date.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          client_name: cleanName,
          phone: cleanedPhone,
          email: cleanEmail,
          service: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
          notes: formData.notes.trim(),
          status: 'pending',
        },
      ])

      if (error) {
        console.error('Supabase Insert Error:', error.message)
        showAlert('Database Error', error.message)
        return
      }

      if (sendMethod === 'whatsapp') {
        const text = `Hello Magethe Beauty Salon! 👋\n\nI want to confirm an appointment request:\n\n💇‍♀️ *Service:* ${formData.service}\n👤 *Name:* ${cleanName}\n📞 *Phone:* ${cleanedPhone}\n📧 *Email:* ${cleanEmail}\n📅 *Date:* ${formData.date}\n⏰ *Time:* ${formData.time}\n📝 *Notes:* ${formData.notes.trim() || 'None'}`
        window.open(`https://wa.me/${SALON_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
      } else {
        const subject = `Booking Request: ${formData.service} - ${cleanName}`
        const body = `Service: ${formData.service}\nName: ${cleanName}\nPhone: ${cleanedPhone}\nEmail: ${cleanEmail}\nDate: ${formData.date}\nTime: ${formData.time}\nNotes: ${formData.notes.trim() || 'None'}`
        window.location.href = `mailto:${SALON_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }

      setSubmitted(true)
    } catch (err) {
      showAlert('Booking Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking-page">
      {/* Modern Pop-up Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      <div className="container">
        <h1 className="booking-title">Book Your Appointment</h1>
        <p className="booking-subtitle">Select your desired service, date, and time.</p>

        {submitted ? (
          <div className="booking-success-card">
            <div className="success-icon" style={{ fontSize: '2.5rem' }}>✓</div>
            <h2>Appointment Request Received!</h2>
            <p>We've logged your request and opened your confirmation message.</p>
            <button className="btn-reset" onClick={() => setSubmitted(false)}>
              Book Another Session
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="Bridal Package (Events) — R1200 (180 mins)">Bridal Package (Events) — R1200 (180 mins)</option>
                <option value="Hair Styling — R450">Hair Styling — R450</option>
                <option value="Full Glam Makeup — R600">Full Glam Makeup — R600</option>
              </select>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Thabo Molefe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 082 345 6789"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  required
                  min={todayString}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes / Special Instructions (Optional)</label>
              <textarea
                placeholder="Any special requests or details..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="channel-toggle-group">
              <label>
                <input
                  type="radio"
                  name="bookingChannel"
                  value="whatsapp"
                  checked={sendMethod === 'whatsapp'}
                  onChange={() => setSendMethod('whatsapp')}
                />
                Send via WhatsApp
              </label>
              <label>
                <input
                  type="radio"
                  name="bookingChannel"
                  value="email"
                  checked={sendMethod === 'email'}
                  onChange={() => setSendMethod('email')}
                />
                Send via Email
              </label>
            </div>

            <button type="submit" className="btn-submit-booking" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Booking Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}