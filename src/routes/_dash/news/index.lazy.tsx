import ExampleWithProviders from '@/components/SettingsRotue/News'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/news/')({
    component: ExampleWithProviders
})