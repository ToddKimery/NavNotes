import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// #### GET ALL NOTES ####
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

// #### DELETE SELECTED NOTE ####
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

// #### TOGGLES NOTE COMPLETION ####
export const PATCH = async (req, res) => {
  const supabase = createClient()
  const getData = await req.json()
  const { id, type, title } = getData
  switch (type) {
    case 'toggleCompletion':
      console.log('PATCH on API', getData)
      const { updateStatus } = getData
      const { data: status, error: statusError } = await supabase
        .from('notes')
        .update({ completed: updateStatus })
        .eq('id', id)
      if (statusError) {
        console.log(statusError)
        throw statusError
      }

      return
      status
      // NextResponse.json({
      //   message: 'Status PATCH request received',
      //   id: id,
      //   completed: updateStatus,
      //   type: type,
      // })
      break

    case 'editNote':
      console.log('PATCH on API', getData)
      const { id: editId } = getData
      const { data: edit, error: editError } = await supabase
        .from('notes')
        .update({ editing: true })
        .eq('id', id)
      if (editError) {
        throw editError
      }

      return NextResponse.json({
        message: 'Edit PATCH request received',
        id: id,
        editing: editing,
        type: type,
      })
      break
    case 'cancelEdit':
      console.log('Cancel Edit: ', getData)
      const { id: cancelEditId } = getData
      const { data: cancelEdit, error: cancelEditError } = await supabase
        .from('notes')
        .update({ editing: false })
        .eq('id', cancelEditId)
      if (cancelEditError) {
        throw new Error(cancelEditError)
      }

      return cancelEdit

      break

    case 'updateEdit':
      console.log('Update Edit: ', getData)
      const { id, title: updateTitle } = getData
      const { data: updateEdit, error: updateEditError } = await supabase
        .from('notes')
        .update({ title: updateTitle, editing: false })
        .eq('id', id)
      if (editError) {
        throw editError
      }

      return
      data

      break
    case 'default':
      return res.status(405).json({ error: 'Method Not Allowed' })
  }
}
//#### CREATES NEW NOTE ####
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
