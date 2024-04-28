import { AuthContextType } from "@/contexts";
import { AuthProvider } from "@/providers";
import { useAuth } from "@/hooks";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";
import "./index.css";
import { ModalProvider } from "./contexts/ModalContext";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp: React.FC = () => {
  const auth: AuthContextType = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <InnerApp />
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
