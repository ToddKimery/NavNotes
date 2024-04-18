// app/posts/page.jsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { queryKeys } from '@/services/constants'
import { createClient } from '@/utils/supabase/server'
import NoteWrapperCopy from '@/components/notes/NoteWrapper-copy'
import { ssrNotes } from '@/services/api/notesApi'
import { cookies } from 'next/headers'

export default async function ssrNotesPage() {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
  const supabase = createClient()
  const data2 = await queryClient.prefetchQuery({
    queryKey: [queryKeys.ssrNotes],
    queryFn: ssrNotes,
  })

  const { data: userData, error } = await supabase.from('users').select()
  const { data: notes } = await supabase.from('notes').select()
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteWrapperCopy data2={notes} userData={userData} />
    </HydrationBoundary>
  )
}
