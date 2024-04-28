import { createRootRouteWithContext } from "@tanstack/react-router";
import { useAuth } from "@/hooks";
import Root from "@/pages/Root";
import { QueryClient } from "@tanstack/react-query";
import NotFound from "@/pages/NotFound";

export interface RouterContext {
  auth: ReturnType<typeof useAuth>;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: NotFound,
});
