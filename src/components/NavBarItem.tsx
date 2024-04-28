import { Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface SubItem {
  label: string;
  to?: string;
  subItems?: SubItem[];
}

interface NavItemProps {
  name: string;
  path?: string;
  subItems?: SubItem[];
}

const SubMenuItems: React.FC<{ items: SubItem[] }> = React.memo(({ items }) => {
  const navigate = useNavigate();
  return (
    <MenubarContent>
      {items &&
        items.map((item:any) => (
          <React.Fragment key={item.label}>
            {!item.subItems && (
              <MenubarItem>
                {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
              </MenubarItem>
            )}
            {item?.subItems && (
              <MenubarSub>
                <MenubarSubTrigger>
                  {item.to ? (
                    <Link to={item?.to}>{item?.label}</Link>
                  ) : (
                    item.label
                  )}
                </MenubarSubTrigger>
                <MenubarSubContent>
                  {item.subItems.map((navSubSubItem:any) => (
                    <MenubarItem
                      key={navSubSubItem.label}
                      onClick={() => navigate({ to: navSubSubItem.to })}
                    >
                      {navSubSubItem.label}
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarSub>
            )}
          </React.Fragment>
        ))}
    </MenubarContent>
  );
});

const NavBarItem: React.FC<NavItemProps> = React.memo(
  ({ name, path, subItems }) => {
    return (
      <MenubarMenu>
        <MenubarTrigger>
          {path ? <Link to={path}>{name}</Link> : name}
        </MenubarTrigger>
        {subItems && subItems.length > 0 && <SubMenuItems items={subItems} />}
      </MenubarMenu>
    );
  },
);

export default NavBarItem;
