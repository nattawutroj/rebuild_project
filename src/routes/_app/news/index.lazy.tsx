import ExampleWithProviders from '@/components/SettingsRotue/News'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/news/')({
    component: ExampleWithProviders
})