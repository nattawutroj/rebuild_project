import Dashboard from '@/Dashboard'
import ExampleWithProviders from '@/components/TableTeaher'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/teacher/')({
    component: ExampleWithProviders
})