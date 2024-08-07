import { getCoursesQueryOptions } from '@/api/queries/bdm';
import { RouterContext } from '@/routes/__root';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dash/student_grops/')({
    pendingComponent: () => <div>Loadding</div>,
    staleTime: 10 * 60 * 1000,
})