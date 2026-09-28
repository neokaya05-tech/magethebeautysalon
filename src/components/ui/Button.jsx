import React from 'react'
import './Button.css'

export default function Button({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'text'
  onClick, 
  type = 'button',
  className = '' 
}) {
  return (
    <button 
      type={type} 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}