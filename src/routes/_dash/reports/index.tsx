import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dash/reports/')({
    pendingComponent: () => <div>Loadding</div>,
    staleTime: 10 * 60 * 1000,
})