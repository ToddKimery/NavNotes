// #### Works on client side
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
// import { queryKeys } from '@/services/constants'

// import {
//   addNote,
//   // deleteNote,
//   toggleCompletion,
//   getNotes,
// } from '@/services/api/notesApi'
// import { title } from 'process'

// export function useAddNote() {
//   const queryClient = useQueryClient()

//   const { mutate: addNoteMutation } = useMutation({
//     mutationKey: [queryKeys.addNote],
//     mutationFn: note => addNote(note),
//     onSuccess: data => {
//       queryClient.invalidateQueries(queryKeys.notes)
//       console.log('Successfully added: ', data)
//     },
//     onError: () => console.log('ERROR:', error),
//   })

//   return { addNoteMutation }
// }

// export function useSubscribed() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: [queryKeys.subscribed],
//     queryFn: channels,
//     onSuccess: data => console.log('Successfully fetched notes: ', data),
//     onError: () => console.log('ERROR:', error),
//   })
//   return { data, isLoading, error }
// }

// #### This works client side
// export function useToggleCompletion() {
//   const queryClient = useQueryClient()
//   const { mutate: toggleCompletionMutation } = useMutation({
//     mutationKey: [queryKeys.toggleCompletion],
//     mutationFn: ({ id, updateStatus }) => toggleCompletion(id, updateStatus),
//     onSuccess: (context, data, status, error) => {
//       console.log('DO I HAVE A status? ', status)
//       console.log('DO I HAVE A context? ', error)
//       queryClient.invalidateQueries({ notes: true })
//       console.log('Successfully toggled completion: ', data)
//     },
//     onError: () => console.log('ERROR:', error),
//   })

//   return { toggleCompletionMutation }
// }