import ExampleWithProviders from '@/components/SettingsRotue/Subject'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/subjects/')({
    component: ExampleWithProviders
})