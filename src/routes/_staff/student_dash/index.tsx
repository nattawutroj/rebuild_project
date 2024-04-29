import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_staff/student_dash/')({
    pendingComponent: () => <div>Loadding</div>,
    staleTime: 10 * 60 * 1000,
})