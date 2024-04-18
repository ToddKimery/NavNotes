import Head from 'next/head'
import { createClient } from '@/utils/supabase/server'
import NoteWrapper from '@/components/notes/NoteWrapper.jsx'
import { redirect } from 'next/navigation'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Notes 3.0',
  description: 'The best way to stay on top of your game.',
}

export default async function Notes() {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
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

  // await queryClient.prefetchQuery({
  //   queryKey: [queryKeys.allNotes],
  //   queryFn: getNotes,
  // })

  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteWrapper notes={notes} userData={userData} />
      </HydrationBoundary>
    </>
  )
}
