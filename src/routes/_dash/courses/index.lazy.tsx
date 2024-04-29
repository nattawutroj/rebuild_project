
import ExampleWithProviders from '@/components/SettingsRotue/Course'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/courses/')({
    component: ExampleWithProviders
})