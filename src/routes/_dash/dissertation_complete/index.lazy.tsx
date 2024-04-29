import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/dissertation_complete/')({
    component: AdminDash
})