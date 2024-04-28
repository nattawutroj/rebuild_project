import Dashboard from '@/Dashboard'
import ExampleWithProviders from '@/components/TableStuden'
import couresePage from '@/pages/courses/courses'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/student/')({
    component: ExampleWithProviders
})