import Root from '@/pages/Root'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/testreport/$id/$selectReport')({
    component: Root,
})