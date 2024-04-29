import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom3'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/test_title_room/')({
    component: AdminDash
})