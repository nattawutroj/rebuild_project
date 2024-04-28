import { createLazyFileRoute } from '@tanstack/react-router'
import Semester from '@/components/SettingsRotue/Semester'

export const Route = createLazyFileRoute('/_app/semester/')({
    component: Semester
})