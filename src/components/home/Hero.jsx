import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import Button from '../ui/Button'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Beauty, made for <br />
            <span>your moment.</span>
          </h1>
          <p className="hero-subtitle">
            Hair, makeup and nail services for everyday beauty, unforgettable 
            occasions and professional productions.
          </p>
          
          <div className="hero-actions">
            <Link to="/booking">
              <Button variant="primary">Book an Appointment</Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary">Explore Services</Button>
            </Link>
          </div>

          <div className="hero-trust">
            <div className="hero-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#B08B59" color="#B08B59" />
              ))}
            </div>
            <span className="hero-rating"><strong>4.6/5</strong> from 16 reviews</span>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            {/* Using a high quality Unsplash beauty placeholder until final photos are loaded */}
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop" 
              alt="Magethe Beauty Salon client showcase" 
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}