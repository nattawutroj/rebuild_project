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
import { Home } from 'lucide-react';
import { BookCheck } from 'lucide-react';
import { UserRoundCog } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Settings } from 'lucide-react';
interface SubItem {
  label: string;
  to?: string;
  subItems?: SubItem[];
}

interface NavItemProps {
  name: string;
  icon: string;
  path?: string;
  subItems?: SubItem[];
}

const SubMenuItems: React.FC<{ items: SubItem[] }> = React.memo(({ items }) => {
  const navigate = useNavigate();
  return (
    <MenubarContent className="font-kanit">
      {items &&
        items.map((item: any) => (
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
                  {item.subItems.map((navSubSubItem: any) => (
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
  ({ name, path, icon, subItems }) => {
    return (
      <MenubarMenu>
        <MenubarTrigger className="font-kanit">
          {icon === 'home' && <Home size={22} className="mr-1 pb-1" />}
          {icon === 'book' && <BookCheck size={22} className="mr-1 pb-1" />}
          {icon === 'setting' && <Settings size={22} className="mr-1 pb-1" />}
          {icon === 'report' && <ClipboardPlus size={22} className="mr-1 pb-1" />}
          {icon === 'user' && <UserRoundCog size={22} className="mr-1 pb-1" />}
          {path ? <Link to={path}>{name}</Link> : name}
        </MenubarTrigger>
        {subItems && subItems.length > 0 && <SubMenuItems items={subItems} />}
      </MenubarMenu>
    );
  },
);

export default NavBarItem;
