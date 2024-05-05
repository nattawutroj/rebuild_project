import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/allpro')({
  component: () => <div>Hello /allpro!</div>
})