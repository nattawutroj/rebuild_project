import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { Outlet } from "@tanstack/react-router";
import React from "react";

const StaffLayout: React.FC = () => {
  return (
    <>
      <Header />
      <hr />
      <article className="flex h-full min-h-[100vh] w-full flex-col bg-cpBlue px-20 py-8 max-md:max-w-full max-md:px-5 max-md:py-5">
        <section className="mt-6 flex flex-col rounded border border-solid border-slate-200 bg-white px-6 py-6 text-sm max-md:max-w-full max-md:px-5">
          <Outlet />
        </section>
      </article>
    </>
  );
};

export default StaffLayout;
