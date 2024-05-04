import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/services/constants'


import {
  addNote,
  // deleteNote,
  toggleCompletion,
  getNotes,
} from '@/services/api/notesApi'
import { title } from 'process'

// #### Works on client side
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

export function useToggleCompletion() {
  const queryClient = useQueryClient()
  const { mutate: toggleCompletionMutation } = useMutation({
    mutationKey: [queryKeys.toggleCompletion],
    mutationFn: async ({ id, updateStatus, type, title }) => {
      const response = await fetch(`/api/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updateStatus, type, title }),
      })

      if (!response.status === 'success') {
        throw new Error('Network response was not ok')
      }

      return { type, id }
    },
    onSuccess: ({ type, id }) => {
      queryClient.invalidateQueries(queryKeys.notes)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { toggleCompletionMutation }
}

// ### This works server side to get all notes ###
export function useGetNotes() {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.allNotes],
    queryFn: async () => {
      const response = await fetch('/api/notes');
      if (!response.ok) { // Checks if the status code is not in the range 200-299
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onError: (error) => console.log('ERROR:', error),
  });

  return { data, isLoading, error };
}


// #### WORKING TO GET NOTES #####
// export function useGetNotes() {
//   const queryClient = useQueryClient();

//   const { data, isLoading, error } = useQuery({
//     queryKey: [queryKeys.allNotes],
//     queryFn: async () => {
//       try {
//         let notes = await getNotesFromIDB();
//         if (notes.length === 0) {
//           const response = await fetch('/api/notes');
//           if (!response.ok) throw new Error('Network response was not ok');
//           notes = await response.json();
//           notes.forEach(note => saveNoteToIDB(note));
//         }
//         return notes;
//       } catch (err) {
//         console.error('Error fetching notes:', err);
//         throw err;
//       }
//     },
//     onSuccess: data => console.log('Successfully fetched notes: ', data),
//     onError: err => console.log('ERROR:', err),
//   });

//   return { data, isLoading, error };
// }








//#### This works server side to delete notes by id
export function useDeleteNote() {
  const queryClient = useQueryClient()

  const { mutate: deleteNoteMutation } = useMutation({
    mutationKey: [queryKeys.deleteNote],
    mutationFn: async id => {
      const response = await fetch(`/api/notes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.notes)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { deleteNoteMutation }
}

export function useAddNote() {
  const queryClient = useQueryClient()

  const { mutate: addNoteMutation } = useMutation({
    mutationKey: [queryKeys.addNote],
    mutationFn: async ({ id, message, completed }) => {
      console.log('note from useAddNote: ', id)
      const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: message,
          completed,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.notes)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { addNoteMutation }
}
