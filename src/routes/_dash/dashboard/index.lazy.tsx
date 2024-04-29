import Dashboard from '@/Dashboard'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/dashboard/')({
    component: Dashboard
})