import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async req => {
  const supabase = createClient()
  const { data: notes, error } = await supabase.from('notes').select()
  if (error) {
    "Couldn't get notes. Look at /@services/api/notesApi.js.  ERROR:", error
  }
  // console.log('server api: ', notes)
  return NextResponse.json(notes)
}

export async function deleteNote(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) {
    throw error
  }
}

export const DELETE = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  const { id } = await req.json()

  const supabase = createClient()

  const { data, error } = await supabase.from('notes').delete().eq('id', id)

  return NextResponse.json({
    message: 'DELETE request received',
    deletedData: id,
  })
}

export const PATCH = async (req, res) => {
  const supabase = createClient()
  const getData = await req.json()

  const { updateStatus, id } = getData
  const { data, error } = await supabase
    .from('notes')
    .update({ completed: updateStatus })
    .eq('id', id)
  if (error) {
    throw error
  }

  return NextResponse.json({
    message: 'POST request received',
    id: id,
    completed: updateStatus,
  })
}

export const POST = async (req, res) => {
  const supabase = createClient()
  const getData = await req.json()
  console.log('POST on API', getData)
  const { id, title, completed, isEditing } = getData
  const { data, error } = await supabase
    .from('notes')
    .insert([{ id, title, completed }])
    .select()
  if (error) {
    console.error(`Something didn't work. Error: `, error)
  }
  return NextResponse.json({
    message: 'POST request received',
    title,
    completed,
  })
}
