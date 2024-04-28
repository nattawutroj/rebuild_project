import { getCoursesQueryOptions } from '@/api/queries/bdm';
import { RouterContext } from '@/routes/__root';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/courses/')({
    pendingComponent: () => <div>Loadding</div>,
    loader: ({ context }: { context: RouterContext }) => {
        context.queryClient.ensureQueryData(
            getCoursesQueryOptions()
        );
    },
    staleTime: 10 * 60 * 1000,
})