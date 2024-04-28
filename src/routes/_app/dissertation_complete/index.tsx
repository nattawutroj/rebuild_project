import Dashboard from '@/DashboardLayout';
import { getCoursesQueryOptions } from '@/api/queries/bdm';
import { RouterContext } from '@/routes/__root';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dissertation_complete/')({
    pendingComponent: () => <div>Loadding</div>,
    component: Dashboard,
    staleTime: 10 * 60 * 1000,
})