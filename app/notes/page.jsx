import Head from 'next/head'
import { createClient } from '@/utils/supabase/server'
import NoteWrapper from '@/components/notes/NoteWrapper.jsx'
import { redirect } from 'next/navigation'
import {
  QueryClient,
} from '@tanstack/react-query'



export const metadata = {
  title: 'Notes 3.0',
  description: 'The best way to stay on top of your game.',
}

export default async function Notes() {
  const queryClient = new QueryClient()
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect(`/login?redirect=notes`)
  }

  const { data: notes } = await supabase.from('notes').select()
  const { data: userData, error } = await supabase.from('users').select()

  supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'notes' },
      payload => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()

  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>

        <NoteWrapper notes={notes} userData={userData} />


    </>
  )
}
