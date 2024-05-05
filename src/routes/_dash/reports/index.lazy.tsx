import AdminDash from '@/components/ReportProTea'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/reports/')({
    component: AdminDash
})