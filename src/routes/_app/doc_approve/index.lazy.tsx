import Dashboard from '@/Dashboard'
import AdminDash from '@/components/AdminDashCom5'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/doc_approve/')({
    component: AdminDash
})