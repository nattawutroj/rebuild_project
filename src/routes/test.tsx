import LoginComponent from "@/pages/Login";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import NotFound from "@/pages/NotFound";
import MyDocument from "@/libs/Report/Helloworlda";

export const Route = createFileRoute("/test")({
  component: MyDocument,
  notFoundComponent: NotFound,
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),
});
