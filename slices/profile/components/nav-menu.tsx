import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation } from "shared/hooks/use-navigation";
import { useProjectRoutes } from "shared/hooks/use-project-routes";
import { cn } from "shared/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "shared/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function NavMenu() {
  const { getMenuForRole } = useNavigation();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const location = useLocation();
  const { getProjectPath } = useProjectRoutes();

  const menuSections = getMenuForRole();

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <div className="space-y-4 py-4">
      {menuSections.map((section) => (
        <div key={section.title} className="px-3">
          <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-sidebar-foreground/70">
            {section.title}
          </h2>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Collapsible
                key={item.label}
                open={openSections.includes(item.label)}
                onOpenChange={() => toggleSection(item.label)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections.includes(item.label) ? "rotate-180" : ""
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-8 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        location.pathname === subItem.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      {subItem.icon && <subItem.icon className="h-4 w-4" />}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}