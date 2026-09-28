// src/services/contactService.js
import { supabase } from '../lib/supabase'

export async function sendContactMessage(payload) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        service_type: payload.serviceType || null,
        message: payload.message
      }
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}