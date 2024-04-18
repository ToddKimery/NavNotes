// pages/api/notes.js
import { createSupabase } from './pagesApiSupabase'

export default async function handler(req, res) {
  const supabase = createSupabase()
  // console.log('req', req)
  // console.log('res', res)
  // console.log('supabase: ', supabase)
  // const token = req.headers.token
  // supabase.auth.setAuth(token)

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   console.log('User not logged in.')
  // }

  console.log('Something happened!')
  if (req.method === 'GET') {
    console.log('GET request called')
    const { data: notes, error } = await supabase
      .from('notes_duplicate')
      .select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(notes)
  }

  // #### ADD NOTE ####
  if (req.method === 'POST') {
    console.log('POST request called: ', req.body)
    const { data, error } = await supabase
      .from('notes_duplicate')
      .insert([{ id: req.body.id, title: req.body.message, completed: false }])
      .select()

    if (error) {
      console.log('Error from /pages/api/notesApi.js POST request: ', error)
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json(data)
  }

  if (req.method === 'PUT') {
    const { data, error } = await supabase
      .from('notes')
      .update({ completed: req.body.updateStatus })
      .eq('id', req.body.id)
    if (error) return res.status(500).json({ error: error.message })
    console.log('Res.data: ', res.json(data))
    return res.status(200).json(data)
  }

  if (req.method === 'DELETE') {
    console.log('old delete id: ', req.body.id)
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', req.body.id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Note deleted successfully' })
  }

  res.status(405).json({ message: 'Method not allowed' })

  //   if (req.method === 'DELETE') {
  //     const id = req.query.id // Change to use query parameter
  //     console.log('delete id: ', req.body.id)
  //     const { error } = await supabase.from('notes').delete().eq('id', id)

  //     if (error) return res.status(500).json({ error: error.message })
  //     return res.status(200).json({ message: 'Note deleted successfully' })
  //   }
  //   res.status(405).json({ message: 'Method not allowed' })
}
