'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// client is very useful for cashing data and making it available for the user
const client = new QueryClient()

type Props = {
  children: React.ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider