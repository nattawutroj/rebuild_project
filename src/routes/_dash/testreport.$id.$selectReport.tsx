import Root from '@/pages/Root'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dash/testreport/$id/$selectReport')({
    component: Root,
})