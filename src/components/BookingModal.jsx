import React, { useState } from 'react'
import { X, MessageSquare, Mail, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './BookingModal.css' // Or your modal styles file

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Hair Styling',
    date: '',
    time: ''
  })

  const [bookingChoice, setBookingChoice] = useState('whatsapp') // 'whatsapp' or 'email'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Replace with your salon's WhatsApp phone number (in international format without + or spaces)
  const SALON_WHATSAPP_NUMBER = '27820000000' 
  // Replace with your salon's email address
  const SALON_EMAIL = 'info@magethebeautysalon.co.za'

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Save appointment to Supabase database first
      const { error } = await supabase.from('appointments').insert([
        {
          client_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
          preferred_channel: bookingChoice,
          status: 'pending'
        }
      ])

      if (error) throw error

      // 2. Route based on client's selected choice
      if (bookingChoice === 'whatsapp') {
        const message = `Hello Magethe Beauty Salon! 👋\n\nI would like to book an appointment:\n\n📌 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n✉️ *Email:* ${formData.email}\n💇‍♀️ *Service:* ${formData.service}\n📅 *Date:* ${formData.date}\n⏰ *Time:* ${formData.time}`
        
        const encodedMessage = encodeURIComponent(message)
        window.open(`https://wa.me/${SALON_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
      } else {
        const mailSubject = encodeURIComponent(`New Booking Request: ${formData.service} - ${formData.name}`)
        const mailBody = encodeURIComponent(`Hello Magethe Beauty Salon,\n\nI would like to request an appointment with the following details:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\nDate: ${formData.date}\nTime: ${formData.time}\n\nPlease confirm my booking.\n\nThank you!`)
        
        window.location.href = `mailto:${SALON_EMAIL}?subject=${mailSubject}&body=${mailBody}`
      }

      setIsSuccess(true)
    } catch (err) {
      alert('Failed to process booking: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="booking-success-view">
            <CheckCircle2 size={48} className="success-icon" />
            <h2>Booking Request Sent!</h2>
            <p>Your appointment details were saved. We will review and confirm your slot shortly.</p>
            <button className="btn-primary" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Book an Appointment</h2>
            <p className="modal-subtitle">Choose how you would like to connect with us</p>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="Phone / WhatsApp Number" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Hair Styling">Hair Styling</option>
                  <option value="Nail Art & Acrylics">Nail Art & Acrylics</option>
                  <option value="Full Glam Makeup">Full Glam Makeup</option>
                  <option value="Special Events">Special Events</option>
                </select>
              </div>

              <div className="form-row">
                <input 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input 
                  type="time" 
                  required 
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              {/* Option Selector Toggle */}
              <div className="booking-options-label">Send Confirmation Via:</div>
              <div className="channel-toggle-grid">
                <button
                  type="button"
                  className={`channel-card ${bookingChoice === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => setBookingChoice('whatsapp')}
                >
                  <MessageSquare size={20} />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  className={`channel-card ${bookingChoice === 'email' ? 'active' : ''}`}
                  onClick={() => setBookingChoice('email')}
                >
                  <Mail size={20} />
                  <span>Email</span>
                </button>
              </div>

              <button type="submit" className="btn-primary submit-booking-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : `Confirm & Send via ${bookingChoice === 'whatsapp' ? 'WhatsApp' : 'Email'}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}