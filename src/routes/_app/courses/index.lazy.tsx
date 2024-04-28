
import Boss from '@/components/SettingsRotue/Boss'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/courses/')({
    component: Boss
})