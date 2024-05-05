import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouterState } from "@tanstack/react-router";
import { capitalize } from "lodash";
import React, { useMemo } from "react";
import HomeIcon from "@/assets/icon/home.svg";

const Breadcrumbs: React.FC = () => {
  const { location, matches } = useRouterState();
  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = [
      { name: "Home", path: "/dashboard", icon: HomeIcon, alt: "Home Icon" },
      ...pathnames.map((pathname, index) => ({
        name: capitalize(pathname.replace(/-/g, " ")),
        path: `/${pathnames.slice(0, index + 1).join("/")}`,
        icon: undefined,
        alt: "",
      })),
    ];

    return crumbs.length > 1 ? crumbs : [];
  }, [location.pathname]);

  const isValidRoute = !matches.some((match) => match.globalNotFound);
  

  return (
    breadcrumbs.length > 0 &&
    isValidRoute && (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.length > 1 &&
            breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={`${breadcrumb.path}_${index}`}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === 0 ? (
                    <BreadcrumbLink href={breadcrumb.path}>
                      <img src={breadcrumb.icon} alt="Home" />
                    </BreadcrumbLink>
                  ) : index + 1 < breadcrumbs.length ? (
                    <BreadcrumbLink href={breadcrumb.path}>
                      {breadcrumb.name.replace(/_/g, ' ')}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{breadcrumb.name.replace(/_/g, ' ')}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
};

export default Breadcrumbs;
