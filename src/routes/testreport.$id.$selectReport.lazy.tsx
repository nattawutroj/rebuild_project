import App from '@/components/SubComponets/Report'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/testreport/$id/$selectReport')({
    component:  App,
})