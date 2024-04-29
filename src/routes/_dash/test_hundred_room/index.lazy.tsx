import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom10'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/test_hundred_room/')({
    component: AdminDash
})