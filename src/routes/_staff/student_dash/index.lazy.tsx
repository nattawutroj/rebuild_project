import Dashboard from '@/StaffDash'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_staff/student_dash/')({
  component: Dashboard
})