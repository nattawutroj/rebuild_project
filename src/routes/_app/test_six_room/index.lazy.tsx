import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom7'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/test_six_room/')({
    component: AdminDash
})