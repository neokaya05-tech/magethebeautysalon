import React from 'react'
import { Link } from 'react-router-dom'
import { Scissors, Sparkles, HeartHandshake } from 'lucide-react'
import Button from '../ui/Button'
import './ServicesOverview.css'

const services = [
  {
    id: 'hair',
    icon: Scissors,
    title: 'Hair Care & Styling',
    description: 'Precision cuts, custom coloring, extensions, and tailored treatments designed to keep your hair healthy and vibrant.',
    price: 'From R250'
  },
  {
    id: 'makeup',
    icon: Sparkles,
    title: 'Makeup Artistry',
    description: 'Flawless glams, natural looks, and high-definition event makeup crafted for weddings, shoots, and special occasions.',
    price: 'From R450'
  },
  {
    id: 'nails',
    icon: HeartHandshake,
    title: 'Nails & Esthetics',
    description: 'Luxurious manicures, pedicures, gel enhancements, and restorative skin care routines for complete relaxation.',
    price: 'From R180'
  }
]

export default function ServicesOverview() {
  return (
    <section className="services-overview">
      <div className="container">
        <div className="services-header">
          <span className="section-tagline">OUR SPECIALTIES</span>
          <h2 className="section-title">Crafted for Exceptional Care</h2>
          <p className="section-subtitle">
            Explore our curated selection of signature treatments designed to highlight your natural beauty.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <Icon size={24} className="service-icon" />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-footer">
                  <span className="service-price">{service.price}</span>
                  <Link to="/services">
                    <Button variant="text">View Details →</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="services-cta">
          <Link to="/services">
            <Button variant="secondary">View Full Menu & Pricing</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}