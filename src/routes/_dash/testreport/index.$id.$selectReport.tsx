import Dashboard from '@/DashboardLayout';
import { getCoursesQueryOptions } from '@/api/queries/bdm';
import Root from '@/pages/Root';
import { RouterContext } from '@/routes/__root';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dash/testreport/index/$id/$selectReport')({
    pendingComponent: () => <div>Loadding</div>,
    component: Root,
    staleTime: 10 * 60 * 1000,
})