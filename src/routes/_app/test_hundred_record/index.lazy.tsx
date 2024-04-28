import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom11'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/test_hundred_record/')({
    component: AdminDash
})