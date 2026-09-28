import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getGalleryImages } from '../services/galleryService'
import './Gallery.css'

// Import your actual client images
import hair1 from '../assets/gallery/hair1.png'
import hair2 from '../assets/gallery/hair2.png'
import hair3 from '../assets/gallery/hair3.png'
import makeup1 from '../assets/gallery/makeup1.png'
import nails1 from '../assets/gallery/nails1.png'
import nails2 from '../assets/gallery/nails2.png'
import nails3 from '../assets/gallery/nails3.png'
import nails4 from '../assets/gallery/nails4.png'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'hair', label: 'Hair' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nails', label: 'Nails' },
  { id: 'events', label: 'Events' }
]

const localClientImages = [
  { id: 'c1', category: 'hair', title: 'Long Honey Blonde Knotless Braids', url: hair1 },
  { id: 'c2', category: 'hair', title: 'Body Wave Wig Install', url: hair2 },
  { id: 'c3', category: 'hair', title: 'Braided Bob with Curls', url: hair3 },
  { id: 'c4', category: 'makeup', title: 'Full Glam Transformation', url: makeup1 },
  { id: 'c5', category: 'nails', title: 'Classic Red Coffin Nails', url: nails1 },
  { id: 'c6', category: 'nails', title: 'Bright Yellow Summer Nails', url: nails2 },
  { id: 'c7', category: 'nails', title: 'Stiletto French with 3D Charms', url: nails3 },
  { id: 'c8', category: 'nails', title: 'Pink French Tip Acrylics', url: nails4 }
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  
  const [dbItems, setDbItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function fetchImages() {
      setLoading(true)
      setErrorMsg('')
      try {
        const data = await getGalleryImages(activeFilter)
        setDbItems(data || [])
      } catch (err) {
        setErrorMsg('Failed to load gallery: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [activeFilter])

  const filteredLocal = activeFilter === 'all' 
    ? localClientImages 
    : localClientImages.filter(item => item.category === activeFilter)

  const allDisplayItems = [...filteredLocal, ...dbItems]

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <div className="container">
          <h1 className="gallery-title">Our Gallery</h1>
          <p className="gallery-subtitle">Beauty, Captured.</p>
        </div>
      </div>

      {/* Categories */}
      <div className="container">
        <div className="gallery-tabs">
          {categories.map((tab) => (
            <button
              key={tab.id}
              className={`gallery-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Skeleton Loader Grid */}
        {loading ? (
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="gallery-skeleton-card">
                <div className="skeleton-pulse"></div>
              </div>
            ))}
          </div>
        ) : errorMsg ? (
          <div className="form-error-alert">{errorMsg}</div>
        ) : allDisplayItems.length === 0 ? (
          <p className="no-images-text">No images found for this category.</p>
        ) : (
          /* Real Image Grid */
          <div className="gallery-grid">
            {allDisplayItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
                role="button"
                tabIndex={0}
              >
                <img 
                  src={item.url || item.image_url} 
                  alt={item.title} 
                  className="gallery-img" 
                />
                <div className="gallery-overlay">
                  <span className="gallery-card-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <img 
              src={selectedImage.url || selectedImage.image_url} 
              alt={selectedImage.title} 
              className="lightbox-img" 
            />
            <p className="lightbox-caption">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}