import { supabase } from '@/utils/supabase/supabase'
// import { createClient } from '@/utils/supabase/client'
// const supabase = createClient()

export async function getNotes() {
  const { data: notes, error } = await supabase.from('notes').select()
  if (error) {
    "Couldn't get notes. Look at /@services/api/notesApi.js.  ERROR:", error
  }
  console.log('original api: ', notes)
  return notes
}

export async function ssrNotes() {
  const { data: ssrNotes, error } = await supabase
    .from('notes_duplicate')
    .select()
  if (error) {
    "Couldn't get notes. Look at /@services/api/notesApi.js.  ERROR:", error
  }
  console.log('original api: ', notes)
  return ssrNotes
}

export async function deleteNote(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) {
    throw error
  }
}

export async function addNote(note) {
  console.log('Note from API: ', note)
  const { data, error } = await supabase
    .from('notes')
    .insert([{ id: note.id, title: note.message, completed: false }])
    .select()
  if (error) {
    console.error(`Something didn't work. Error: `, error)
  }
  return data
}

export async function toggleCompletion(id, updateStatus) {
  console.log('toggleCompletion in notesApi.js: ', id, updateStatus)
  const { data, error } = await supabase
    .from('notes')
    .update({ completed: updateStatus })
    .eq('id', id)
  if (error) {
    throw error
  }
  return data
}
