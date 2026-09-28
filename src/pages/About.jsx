import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Heart, Sparkles, ShieldCheck, X } from 'lucide-react'
import Button from '../components/ui/Button'
import './About.css'

const values = [
  {
    id: 'excellence',
    icon: Award,
    title: 'Excellence',
    description: 'We deliver the highest quality in everything we do.',
    detailedText: 'At Magethe, excellence is our standard, not an option. We rigorously select premium beauty products, train continuously on modern techniques, and refine every single step of your service to ensure an unmatched luxury experience.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'care',
    icon: Heart,
    title: 'Care',
    description: 'We care about your comfort and confidence.',
    detailedText: 'Your comfort and piece of mind come first. We listen closely to your personal needs and beauty goals, maintaining a warm, sanitary, and hospitable atmosphere where you can relax and feel genuinely pampered.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'creativity',
    icon: Sparkles,
    title: 'Creativity',
    description: 'We bring your vision to life with creativity.',
    detailedText: 'Beauty is self-expression. Our artists blend current trends with classic aesthetics, tailoring haircuts, glams, and nail sets to suit your unique flair, personality, and specific event theme seamlessly.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'professionalism',
    icon: ShieldCheck,
    title: 'Professionalism',
    description: 'We are reliable, experienced and passionate.',
    detailedText: 'Punctuality, clear communication, and unyielding hygiene standard define our operational philosophy. Whether you visit us individually or contract us for large sets, we deliver dependable professionalism.',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop'
  }
]

const spaceImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    caption: 'Main Styling Area & Reception'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop',
    caption: 'Nail Station & Treatment Lounge'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop',
    caption: 'Private Glam Suites'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    caption: 'Hair Wash & Conditioning Bar'
  }
]

const galleryImages = [
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop'
]

export default function About() {
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <div className="container">
          <h1 className="about-title">About Magethe</h1>
          <p className="about-subtitle">Passion. Purpose. Perfection.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container story-container">
          <div className="story-image-card">
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop" 
              alt="Magethe Salon Interior" 
              className="story-img"
            />
          </div>

          <div className="story-content">
            <h2 className="story-heading">Our Story</h2>
            <p className="story-text">
              Magethe Beauty Salon is a beauty service provider, specializing in makeup, nails and hair services for individual clients, production houses and B2Bs that require beauty services.
            </p>
            <p className="story-text">
              Having an upcoming event such as graduation hair and makeup, wedding, baby showers, matric dance, production shoots etc. do reach out to us to serve you as your most trusted beauty service provider.
            </p>
            <Link to="/booking">
              <Button variant="primary" className="story-btn">Book an Appointment</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title text-center">Why choose Magethe?</h2>
          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon">✂️</div>
              <h3>One-stop beauty destination</h3>
              <p>Hair, makeup and nails all in one place.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💍</div>
              <h3>Events & productions</h3>
              <p>From weddings to production sets, we've got you covered.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">👑</div>
              <h3>Professional experience</h3>
              <p>Skilled, friendly and dedicated to making you feel your best.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">📍</div>
              <h3>Convenient location</h3>
              <p>Located in Cosspace, Kya Sand for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="feature-section">
        <div className="container feature-grid">
          <div className="feature-card feature-card-light">
            <div className="feature-info">
              <h3>More than a salon.</h3>
              <p>Weddings • Graduations • Matric Dances • Baby Showers and more</p>
              <Link to="/booking" className="btn-feature">Plan Your Beauty Experience</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop" alt="Salon experience" className="feature-img" />
          </div>

          <div className="feature-card feature-card-dark">
            <div className="feature-info">
              <h3>Production & B2B</h3>
              <p>Production shoots • Teams • Professional bookings and partnerships</p>
              <Link to="/contact" className="btn-feature">Discuss a Production</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop" alt="Production work" className="feature-img" />
          </div>
        </div>
      </section>

      {/* Mini Gallery Preview */}
      <section className="mini-gallery-section">
        <div className="container text-center">
          <h2 className="section-title">See the Magethe look.</h2>
          <div className="mini-gallery-grid">
            {galleryImages.map((img, idx) => (
              <img key={idx} src={img} alt={`Look ${idx + 1}`} className="gallery-thumb" />
            ))}
          </div>
          <Link to="/gallery" className="btn-outline">View Our Work</Link>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="section-title">Our Values</h2>
          </div>

          <div className="values-grid">
            {values.map((val) => {
              const Icon = val.icon
              return (
                <div 
                  key={val.id} 
                  className="value-card interactive-card"
                  onClick={() => setSelectedValue(val)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="value-icon-wrapper">
                    <Icon size={24} className="value-icon" />
                  </div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-desc">{val.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Space Section */}
      <section className="space-section">
        <div className="container">
          <div className="space-header">
            <h2 className="section-title">Our Space</h2>
            <p className="space-subtitle">A relaxing, beautiful environment created with you in mind.</p>
          </div>

          <div className="space-grid">
            {spaceImages.map((item) => (
              <div 
                key={item.id} 
                className="space-card interactive-card"
                onClick={() => setSelectedImage(item)}
                role="button"
                tabIndex={0}
              >
                <img src={item.url} alt={item.caption} className="space-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container testimonial-container">
          <h2 className="section-title">Loved by our clients</h2>
          <div className="rating-badge">
            <span className="rating-num">4.6</span>
            <span className="star">★</span>
            <span className="reviews-count">(Based on 18 reviews)</span>
          </div>
          <blockquote className="testimonial-quote">
            "The interior is beautiful, the space is spotless, and the service was truly stellar. I love that it's a one-stop shop. My hair was washed with such care, and the scalp massage was so soothing it nearly put me to sleep — absolute bliss!"
          </blockquote>
          <p className="testimonial-author">- Refilwe Thipe</p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta-banner">
        <div className="container about-cta-container">
          <h2>Your next beauty moment starts here.</h2>
          <div className="cta-actions">
            <Link to="/booking">
              <Button variant="secondary" className="about-cta-btn">Book an Appointment</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE DETAIL MODAL */}
      {selectedValue && (
        <div className="modal-overlay" onClick={() => setSelectedValue(null)}>
          <div className="modal-card value-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedValue(null)}>
              <X size={20} />
            </button>
            <div className="value-modal-image-wrapper">
              <img src={selectedValue.image} alt={selectedValue.title} className="value-modal-img" />
            </div>
            <div className="value-modal-content">
              <div className="value-modal-header">
                {React.createElement(selectedValue.icon, { size: 28, className: 'value-modal-icon' })}
                <h2>{selectedValue.title}</h2>
              </div>
              <p className="value-modal-text">{selectedValue.detailedText}</p>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="modal-overlay lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img src={selectedImage.url} alt={selectedImage.caption} className="lightbox-img" />
            <p className="lightbox-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}