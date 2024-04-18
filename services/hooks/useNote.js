import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/services/constants'
import { getAllNotes } from '@/pages/api/newNotesApi'

async function fetchAPI(route, method, body) {
  const res = await fetch(route, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res()
}

export function useDeleteNote() {
  const queryClient = useQueryClient()

  const { mutate: deleteNoteMutation } = useMutation({
    mutationKey: [queryKeys.deleteNote],
    mutationFn: id => fetchAPI('/api/notesApi', 'DELETE', { id }),
    onSuccess: data => {
      queryClient.invalidateQueries(queryKeys.notes)
      console.log('Successfully deleted: ', data)
    },
    onError: error => console.log('ERROR:', error),
  })

  return { deleteNoteMutation }
}

export function useAddNote() {
  const queryClient = useQueryClient()
  console.log('useAddNote')
  const { mutate: addNoteMutation } = useMutation({
    mutationKey: [queryKeys.addNote],
    mutationFn: note => fetchAPI('/api/notesApi', 'POST', note),
    onSuccess: data => {
      queryClient.invalidateQueries(queryKeys.notes)
      console.log('Successfully added: ', data)
    },
    onError: error => console.log('ERROR:', error),
  })

  return { addNoteMutation }
}

export function useToggleCompletion() {
  const queryClient = useQueryClient()
  const { mutate: toggleCompletionMutation } = useMutation({
    mutationKey: [queryKeys.toggleCompletion],
    mutationFn: ({ id, updateStatus }) =>
      fetchAPI('/api/notesApi', 'PUT', { id, updateStatus }),
    onSuccess: data => {
      queryClient.invalidateQueries({ notes: true })
      console.log('Successfully toggled completion: ', data)
    },
    onError: error => console.log('ERROR:', error),
  })

  return { toggleCompletionMutation }
}

// ### This works to get all notes ###
export function useGetNotes() {
  return useQuery({
    queryKey: [queryKeys.allNotes],
    queryFn: async () => {
      const response = await fetch('/api/notesApi')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
    },
  })
}

export function useGetAllNotes() {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.getAllNotes],
    queryFn: getAllNotes,
    onSuccess: data => console.log('Successfully fetched notes: ', data),
    onError: error => console.log('ERROR:', error),
  })
  return { data }
}
