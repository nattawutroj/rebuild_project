import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom8'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/test_six_record/')({
    component: AdminDash
})