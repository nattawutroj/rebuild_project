import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { Route as LoginRoute } from "@/routes/login";
import { checkAuthToken, saveAuthToken } from "@/lib/authUtils";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/pages/AppLayout";
import Home from "@/components/Home";

export const Route = createFileRoute("/_app")({
  notFoundComponent: NotFound,
  component: Home,
});
