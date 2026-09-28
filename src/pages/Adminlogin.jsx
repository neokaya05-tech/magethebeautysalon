import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Modal from '../components/Modal'
import './AdminLogin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: ''
  })

  const showAlert = (title, message) => {
    setModalConfig({ isOpen: true, title, message })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      showAlert('Access Denied', error.message)
      setLoading(false)
      return
    }

    // Success! Navigate to dashboard
    setLoading(false)
    navigate('/admin/dashboard')
  }

  return (
    <div className="admin-login-page">
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      <div className="login-card">
        <div className="login-header">
          <span className="lock-icon">🔐</span>
          <h2>Magethe Admin</h2>
          <p>Sign in to access salon management</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              required
              placeholder="admin@magethebeauty.co.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}