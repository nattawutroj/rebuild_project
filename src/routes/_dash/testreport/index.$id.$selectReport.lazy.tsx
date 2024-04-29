import { createLazyFileRoute } from '@tanstack/react-router'
import App from '@/components/SubComponets/Report'

export const Route = createLazyFileRoute('/_dash/testreport/index/$id/$selectReport')({
    component: App
})