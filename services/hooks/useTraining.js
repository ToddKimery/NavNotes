import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { queryKeys } from '@/services/constants'



export function useToggleCompletion() {
  const queryClient = useQueryClient()
  const { mutate: toggleCompletionMutation } = useMutation({
    mutationKey: [queryKeys.toggleCompletion],
    mutationFn: async ({ id, updateStatus, type, title }) => {
      const response = await fetch(`/api/training`, {
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
      queryClient.invalidateQueries(queryKeys.getAllTraining)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { toggleCompletionMutation }
}


//#### This works server side to delete training by id
export function useDeleteTraining() {
  const queryClient = useQueryClient()

  const { mutate: deleteTrainingMutation } = useMutation({
    mutationKey: [queryKeys.deleteTraining],
    mutationFn: async id => {
      const response = await fetch(`/api/training`, {
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
      queryClient.invalidateQueries(queryKeys.getAllTraining)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { deleteTrainingMutation }
}

export function useAddTraining() {
  const queryClient = useQueryClient()

  const { mutate: addTrainingMutation } = useMutation({
    mutationKey: [queryKeys.addTraining],
    mutationFn: async ({ id, message, completed }) => {
      console.log('training from useAddTraining: ', id)
      const response = await fetch(`/api/training`, {
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
      queryClient.invalidateQueries(queryKeys.getAllTraining)
    },
    onError: error => {
      console.log('ERROR:', error)
    },
  })

  return { addTrainingMutation }
}

// ### This works server side to get all training ###
export function useGetTraining() {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.getAllTraining],
    queryFn: async () => {
      const response = await fetch('/api/training');
      if (!response.ok) { // Checks if the status code is not in the range 200-299
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onError: (error) => console.log('ERROR:', error),
  });

  return { data, isLoading, error };
}
