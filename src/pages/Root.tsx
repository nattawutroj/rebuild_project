import React from "react";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

const Devtools: React.FC = () =>
  import.meta.env.MODE === "development" && (
    <>
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </>
  );

const Root: React.FC = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <Devtools />
    </>
  );
};

export default Root;
