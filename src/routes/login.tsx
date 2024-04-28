import LoginComponent from "@/pages/Login";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import NotFound from "@/pages/NotFound";
import Home from "@/components/Home";

export const Route = createFileRoute("/login")({
  component: Home,
  notFoundComponent: NotFound,
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),
});
