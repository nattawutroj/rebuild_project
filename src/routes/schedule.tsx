import BasicDocument from '@/libs/Report/Schedule'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/schedule')({
  component: BasicDocument
})