import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query/hydration'
import ssrNotesPage from '../page'

describe('ssrNotesPage', () => {
  it('renders the Notes component', async () => {
    const queryClient = new QueryClient()

    // Mock the prefetchQuery function
    queryClient.prefetchQuery = jest.fn()

    // Render the ssrNotesPage component with the QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        {await ssrNotesPage()}
      </QueryClientProvider>
    )

    // Assert that the Notes component is rendered
    expect(screen.getByText('Notes')).toBeInTheDocument()

    // Assert that the prefetchQuery function is called with the correct arguments
    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['ssrNotes'],
      queryFn: expect.any(Function),
    })
  })

  it('hydrates the query client with the correct state', async () => {
    const queryClient = new QueryClient()

    // Mock the prefetchQuery function
    queryClient.prefetchQuery = jest.fn()

    // Render the ssrNotesPage component with the QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        {await ssrNotesPage()}
      </QueryClientProvider>
    )

    // Assert that the query client is hydrated with the correct state
    expect(dehydrate(queryClient)).toEqual({
      queries: [
        {
          queryKey: ['ssrNotes'],
          state: expect.any(Object),
        },
      ],
    })
  })
})
