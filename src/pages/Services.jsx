import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import './Services.css'

const categories = [
  { id: 'hair', label: 'Hair' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nails', label: 'Nails' },
  { id: 'events', label: 'Events' },
  { id: 'production', label: 'Production' }
]

const servicesData = {
  hair: {
    title: 'Hair Services',
    subtitle: 'From everyday styles to special occasion looks.',
    items: [
      {
        id: 'h1',
        title: 'Blowouts',
        description: 'Sleek, smooth and voluminous blowout styles.',
        price: 'From R250',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'h2',
        title: 'Wig Installations',
        description: 'Lace wig installs, glueless options and more.',
        price: 'From R450',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'h3',
        title: 'Hair Treatments',
        description: 'Deep conditioning and restorative treatments.',
        price: 'From R300',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'h4',
        title: 'Braids & Updos',
        description: 'Elegant braids and updos for any occasion.',
        price: 'From R300',
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'h5',
        title: 'Hair Colouring',
        description: 'Full colour, highlights and root touch-ups.',
        price: 'From R600',
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'h6',
        title: 'Weave Services',
        description: 'Traditional weaves and sew-in styles.',
        price: 'From R350',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  makeup: {
    title: 'Makeup Artistry',
    subtitle: 'Enhancing your features with precision and luxury products.',
    items: [
      {
        id: 'm1',
        title: 'Soft Glam',
        description: 'Natural radiant base with subtle eyes and neutral lips.',
        price: 'From R450',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'm2',
        title: 'Full Glam',
        description: 'High coverage, cut crease, bold lash, and defined look.',
        price: 'From R650',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  nails: {
    title: 'Nails & Care',
    subtitle: 'Nail health, extensions, and aesthetic treatments.',
    items: [
      {
        id: 'n1',
        title: 'Gel Manicure',
        description: 'Long-lasting gel overlay with shape & cuticle care.',
        price: 'From R220',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 'n2',
        title: 'Acrylic Full Set',
        description: 'Custom length extensions with high-shine polish.',
        price: 'From R350',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  events: {
    title: 'Event Packages',
    subtitle: 'Tailored group glams for special occasions.',
    items: [
      {
        id: 'e1',
        title: 'Bridal Party Package',
        description: 'Full hair and makeup execution for brides and bridesmaids.',
        price: 'Custom Quote',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  production: {
    title: 'Production & Sets',
    subtitle: 'On-site hair and makeup for shoots and media.',
    items: [
      {
        id: 'p1',
        title: 'Full Day On-Set',
        description: 'Dedicated artist for touch-ups and quick changes.',
        price: 'Custom Quote',
        image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('hair')
  const currentCategory = servicesData[activeTab] || servicesData.hair

  return (
    <div className="services-page">
      {/* Header Banner */}
      <div className="services-page-header">
        <div className="container">
          <h1 className="services-page-title">Our Services</h1>
          <p className="services-page-subtitle">Professional beauty services tailored to you.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container">
        <div className="services-tabs">
          {categories.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Category Section */}
        <div className="services-content">
          <div className="category-header">
            <h2 className="category-title">{currentCategory.title}</h2>
            <p className="category-subtitle">{currentCategory.subtitle}</p>
          </div>

          <div className="cards-grid">
            {currentCategory.items.map((item) => (
              <div key={item.id} className="service-item-card">
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                  <div className="card-footer">
                    <span className="card-price">{item.price}</span>
                    <Link to="/booking">
                      <Button variant="secondary" className="btn-book-sm">Book</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Banner */}
        <div className="enquiry-banner">
          <div>
            <h3>Can't find what you're looking for?</h3>
            <p>Let's create the perfect service for you.</p>
          </div>
          <Link to="/contact">
            <Button variant="primary">Enquire Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}