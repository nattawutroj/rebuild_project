import { createLazyFileRoute } from '@tanstack/react-router'
import App from '@/components/SubComponets/Report'

export const Route = createLazyFileRoute('/_app/testreport/index/$id/$selectReport')({
    component: App
})