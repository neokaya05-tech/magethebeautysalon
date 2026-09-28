import { supabase } from '../lib/supabase'

export async function getGalleryImages(category = 'all') {
  let query = supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  // ONLY filter by category if it's NOT 'all'
  if (category && category.toLowerCase() !== 'all') {
    query = query.ilike('category', category)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}