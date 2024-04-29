import ExampleWithProviders from '@/components/SettingsRotue/NameTitle'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dash/name_title/')({
    component: ExampleWithProviders
})