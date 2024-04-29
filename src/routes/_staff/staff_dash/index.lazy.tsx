import Dashboard from '@/StaffDash'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_staff/staff_dash/')({
  component: Dashboard
})