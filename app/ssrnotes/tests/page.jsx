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
import { useGetNotes } from '@/services/hooks/useNote'
import { cookies } from 'next/headers'

export default async function ssrNotesPage() {
  const queryClient = new QueryClient()
  const supabase = createClient()

  const { data: userData, error } = await supabase.from('users').select()

  const { data: data2 } = await supabase.from('notes_duplicate').select()

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.ssrNotes],
    queryFn: ssrNotes,
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteWrapperCopy data2={data2} userData={userData} />
    </HydrationBoundary>
  )
}
