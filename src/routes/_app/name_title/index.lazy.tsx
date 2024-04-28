import ExampleWithProviders from '@/components/SettingsRotue/NameTitle'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/name_title/')({
    component: ExampleWithProviders
})