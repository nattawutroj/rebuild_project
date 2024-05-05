import AdminDash from '@/components/Projectfinpublic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/allpro')({
  component: AdminDash
})