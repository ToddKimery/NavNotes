import { createSupabase } from './pagesApiSupabase'

export async function getAllNotes(req, res) {
  const supabase = createSupabase()

  const { data: notes, error } = await supabase.from('notes_duplicate').select()

  if (error) {
    console.log(
      "Couldn't get notes. Look at /@services/api/notesApi.js. ERROR:",
      error.message
    )
    console.log('notes: ', notes)
    return res.status(500).json({ error: 'Failed to fetch notes' })
  }

  return res.status(200).json(notes)
}
