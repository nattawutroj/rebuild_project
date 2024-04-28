import Dashboard from "@/Dashboard";
import HomeComponent from "@/pages/Home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});
