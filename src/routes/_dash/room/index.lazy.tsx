import { createLazyFileRoute } from '@tanstack/react-router'
import ExampleWithProviders from '@/components/SettingsRotue/Room'

export const Route = createLazyFileRoute('/_dash/room/')({
    component: ExampleWithProviders
})