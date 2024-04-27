'use client'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 500,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export default function ReactQueryClientProvider({ children }: Props) {
  const [queryClient, setQueryClient] = useState<QueryClient | undefined>(browserQueryClient)

  useEffect(() => {
    if (typeof window === 'undefined') {
      // Server: always make a new query client
      setQueryClient(makeQueryClient())
    } else {
      // Browser: make a new query client if we don't already have one
      if (!browserQueryClient) {
        browserQueryClient = makeQueryClient()
        setQueryClient(browserQueryClient)
      }
    }
  }, [])

  if (!queryClient) {
    // If queryClient is not set yet, don't render anything
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}





// 'use client'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import React, { ReactNode, useState } from 'react'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// export default function ReactQueryClientProvider({
//   children,
// }: {
//   children: ReactNode
// }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 1000,
//           },
//         },
//       })
//   )

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   )
// }

// In Next.js, this file would be called: app/providers.jsx
// 'use client'

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
// import { useState,useEffect, use } from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ReactNode } from 'react'
// interface Props{
//   children: ReactNode
// }

// function makeQueryClient() {
//   return new QueryClient({
//     defaultOptions: {
//       queries: {
//         // With SSR, we usually want to set some default staleTime
//         // above 0 to avoid refetching immediately on the client
//         staleTime: 60 * 500,
//       },
//     },
//   })
// }

// let browserQueryClient: QueryClient | undefined = undefined

// function getQueryClient() {
//   useEffect(() => {

//     if (typeof window === 'undefined') {
//       console.log('Server')
//       // Server: always make a new query client
//       return makeQueryClient()
//     } else {
//       // Browser: make a new query client if we don't already have one
//       // This is very important so we don't re-make a new client if React
//       // suspends during the initial render. This may not be needed if we
//       // have a suspense boundary BELOW the creation of the query client
//       if (!browserQueryClient) browserQueryClient = makeQueryClient()
//       return browserQueryClient
//     }
//   }, [])

// export default function ReactQueryClientProvider({ children }) {
//   // NOTE: Avoid useState when initializing the query client if you don't
//   //       have a suspense boundary between this and the code that may
//   //       suspend because React will throw away the client on the initial
//   //       render if it suspends and there is no boundary
//   const queryClient = getQueryClient()

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   )
// }
