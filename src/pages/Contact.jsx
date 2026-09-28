import React, { useState } from 'react'
import './Contact.css'
import { supabase } from '../lib/supabase'
import Modal from '../components/Modal' // <--- Import custom Modal

export default function Contact() {
  const [category, setCategory] = useState('Individual/Beauty')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
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

  // FAQ Modal state
  const [showFaqModal, setShowFaqModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const SALON_WHATSAPP = '27793615528'
  const SALON_EMAIL = 'neokaya05@gmail.com'

  const faqs = [
    { q: 'How far in advance should I book?', a: 'We recommend booking 2 to 3 days in advance for regular individual beauty services, and 2 to 4 weeks prior for bridal or production packages.' },
    { q: 'What is your cancellation policy?', a: 'Cancellations made at least 24 hours prior to your scheduled appointment are free of charge.' },
    { q: 'Do you offer mobile services?', a: 'Yes, on-location glam and bridal package services are available upon request during booking.' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validate Full Name
    const cleanName = formData.name.trim()
    if (cleanName.length < 2) {
      showAlert('Invalid Name', 'Please enter your full name before submitting.')
      return
    }

    // 2. Validate South African Phone Number
    const phoneRegex = /^(\+27|0)\d{9}$/
    const cleanedPhone = formData.phone.replace(/\s+/g, '')

    if (!phoneRegex.test(cleanedPhone)) {
      showAlert('Invalid Phone Number', 'Please enter a valid South African phone number (e.g., 082 345 6789 or +27823456789).')
      return
    }

    // 3. Validate Email Format
    const cleanEmail = formData.email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      showAlert('Invalid Email Address', 'Please enter a valid email address.')
      return
    }

    // 4. Validate Message Minimum Length
    const cleanMessage = formData.message.trim()
    if (cleanMessage.length < 5) {
      showAlert('Short Message', 'Please type a message with at least 5 characters.')
      return
    }

    setLoading(true)

    try {
      // Insert message into Supabase
      const { error } = await supabase.from('messages').insert([
        {
          name: cleanName,
          phone: cleanedPhone,
          email: cleanEmail,
          message: cleanMessage,
          inquiry_category: category
        }
      ])

      if (error) {
        console.error('Supabase DB Notice:', error.message)
        showAlert('Database Notice', error.message)
      }

      // Open selected communication channel
      if (sendMethod === 'whatsapp') {
        const text = `Hello Magethe Beauty Salon! 👋\n\nNew Contact Inquiry (${category}):\n\n👤 *Name:* ${cleanName}\n📞 *Phone:* ${cleanedPhone}\n✉️ *Email:* ${cleanEmail}\n💬 *Message:* ${cleanMessage}`
        window.open(`https://wa.me/${SALON_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
      } else {
        const subject = `Website Inquiry [${category}]: ${cleanName}`
        const body = `Category: ${category}\nName: ${cleanName}\nPhone: ${cleanedPhone}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`
        window.location.href = `mailto:${SALON_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }

      setSubmitted(true)
    } catch (err) {
      showAlert('Submission Error', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Custom Validation Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      {/* Header Banner */}
      <section className="contact-header">
        <span className="contact-badge">Get in Touch</span>
        <h1 className="contact-title">Let's Start a Conversation</h1>
        <p className="contact-subtitle">
          Whether you need individual glam, wedding packages, or production B2B partnerships, we're here to assist.
        </p>
      </section>

      {/* Main Grid */}
      <section className="contact-main-section">
        <div className="contact-grid">
          {/* Left Column: Details */}
          <div className="contact-info-column">
            <h2 className="info-heading">Contact Details</h2>
            <p className="info-subtext">Reach out via phone, email, or visit our space directly.</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Cosspace, Kya Sand, Gauteng</p>
                  <span className="info-meta">Private parking available</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone & Call</h4>
                  <p>+27 79 361 5528</p>
                  <span className="info-meta">Mon – Sat, 8:00 AM – 5:00 PM</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email Us</h4>
                  <p>neokaya05@gmail.com</p>
                  <span className="info-meta">Replies within 24 hours</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">⏰</div>
                <div>
                  <h4>Operating Hours</h4>
                  <p>Monday – Saturday: 08:00 – 17:00</p>
                  <span className="info-meta">Sunday: By Appointment Only</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Box */}
            <div className="whatsapp-box">
              <div className="whatsapp-content">
                <span className="wa-icon" style={{ fontSize: '1.5rem' }}>💬</span>
                <div>
                  <h4>Prefer Instant Chat?</h4>
                  <p>Message us directly on WhatsApp for quick inquiries.</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${SALON_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button className="btn-whatsapp">Chat on WhatsApp</button>
              </a>
            </div>

            {/* FAQ Modal Trigger */}
            <button className="btn-faq-trigger" onClick={() => setShowFaqModal(true)}>
              <span>⏰ Frequently Asked Questions</span>
              <span>›</span>
            </button>
          </div>

          {/* Right Column: Contact Form */}
          <div className="form-wrapper">
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <p className="form-desc">Select your inquiry type and tell us how we can help.</p>

              {submitted ? (
                <div className="success-state">
                  <div className="success-icon" style={{ fontSize: '2.5rem' }}>✓</div>
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. We have logged your request.</p>
                  <button className="btn-reset" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Category Chips */}
                  <div className="form-group">
                    <label>Inquiry Category</label>
                    <div className="category-chips">
                      {['Individual/Beauty', 'Wedding/Event', 'Production & B2B', 'General Inquiry'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`chip ${category === cat ? 'active' : ''}`}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Lerato Dlamini"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. 082 123 4567"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
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

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your event, preferred dates, or specific requirements..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Channel Choice */}
                  <div className="channel-toggle-group">
                    <label>
                      <input
                        type="radio"
                        name="sendChannel"
                        value="whatsapp"
                        checked={sendMethod === 'whatsapp'}
                        onChange={() => setSendMethod('whatsapp')}
                      />
                      Send via WhatsApp
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sendChannel"
                        value="email"
                        checked={sendMethod === 'email'}
                        onChange={() => setSendMethod('email')}
                      />
                      Send via Email
                    </label>
                  </div>

                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-card">
          <div className="map-info">
            <h3>Find Us in Kya Sand</h3>
            <p>Cosspace, Kya Sand, Johannesburg, South Africa</p>
          </div>
          <div className="map-embed">
            <iframe
              title="Magethe Location Map"
              src="https://maps.google.com/maps?q=Kya%20Sand%20Johannesburg&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="modal-overlay" onClick={() => setShowFaqModal(false)}>
          <div className="faq-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowFaqModal(false)}>✕</button>
            <h3>Frequently Asked Questions</h3>
            
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaqIndex === idx ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-arrow">›</span>
                </div>
                {openFaqIndex === idx && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}