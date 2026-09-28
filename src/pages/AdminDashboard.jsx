import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('appointments')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    
    // Fetch from appointments table
    const { data: apptData, error: apptError } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (apptError) {
      console.error('Appointments Fetch Error:', apptError)
    } else {
      console.log('Appointments Data Received:', apptData)
      setAppointments(apptData || [])
    }

    // Fetch from messages table
    const { data: msgData, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (msgError) {
      console.error('Messages Fetch Error:', msgError)
    } else {
      console.log('Messages Data Received:', msgData)
      setMessages(msgData || [])
    }

    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Update Status Error:', error.message)
    } else {
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      )
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const pendingCount = appointments.filter((a) => a.status === 'pending' || !a.status).length
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length
  const totalMessages = messages.length

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Magethe Admin Dashboard</h1>
          <p>Manage bookings and incoming customer inquiries</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Sign Out 🚪
        </button>
      </header>

      <div className="analytics-grid">
        <div className="card stat-card pending">
          <h3>Pending Bookings</h3>
          <span className="stat-number">{pendingCount}</span>
        </div>
        <div className="card stat-card confirmed">
          <h3>Confirmed Sessions</h3>
          <span className="stat-number">{confirmedCount}</span>
        </div>
        <div className="card stat-card messages">
          <h3>Inquiries</h3>
          <span className="stat-number">{totalMessages}</span>
        </div>
      </div>

      <div className="tab-controls">
        <button
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Bookings ({appointments.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages ({messages.length})
        </button>
      </div>

      {loading ? (
        <div className="dashboard-loading" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
          Loading records...
        </div>
      ) : activeTab === 'appointments' ? (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <strong>{appt.client_name || appt.name || 'N/A'}</strong>
                    </td>
                    <td>{appt.service || 'N/A'}</td>
                    <td>
                      <div>{appt.appointment_date || appt.date || 'N/A'}</div>
                      <small style={{ color: '#888' }}>{appt.appointment_time || appt.time || ''}</small>
                    </td>
                    <td>
                      <div>{appt.phone || 'N/A'}</div>
                      <small style={{ color: '#888' }}>{appt.email || ''}</small>
                    </td>
                    <td>
                      <span className={`status-badge ${appt.status || 'pending'}`}>
                        {appt.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action confirm"
                          onClick={() => updateStatus(appt.id, 'confirmed')}
                          disabled={appt.status === 'confirmed'}
                        >
                          ✓ Confirm
                        </button>
                        <button
                          className="btn-action decline"
                          onClick={() => updateStatus(appt.id, 'declined')}
                          disabled={appt.status === 'declined'}
                        >
                          ✕ Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="messages-list">
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No contact messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <strong>{msg.name}</strong> ({msg.inquiry_category || 'General'})
                  <span className="message-date">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                  </span>
                </div>
                <div className="message-contact">
                  📞 {msg.phone} | ✉️ {msg.email}
                </div>
                <p className="message-body">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}