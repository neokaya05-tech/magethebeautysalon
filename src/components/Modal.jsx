import React from 'react'
import './Modal.css'

export default function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-icon">⚠️</div>
        <h3 className="custom-modal-title">{title || 'Notice'}</h3>
        <p className="custom-modal-message">{message}</p>
        <button className="custom-modal-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  )
}