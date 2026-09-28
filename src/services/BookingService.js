// src/services/bookingService.js
import { supabase } from '../lib/supabase'

// Fetch all active salon services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Create an appointment request
export async function createBooking(payload) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        customer_name: payload.customerName,
        customer_phone: payload.customerPhone,
        customer_email: payload.customerEmail,
        service_id: payload.serviceId,
        appointment_date: payload.appointmentDate,
        appointment_time: payload.appointmentTime,
        notes: payload.notes || '',
        status: 'pending'
      }
    ])

  if (error) {
    throw new Error(error.message)
  }

  return data
}