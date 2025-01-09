import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "shared/hooks/use-navigation";
import { useProjectRoutes } from "shared/hooks/use-project-routes";
import { cn } from "shared/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "shared/components/ui/collapsible";
import { Button } from "shared/components/ui/button";
import { ChevronDown } from "lucide-react";

export function NavMenu() {
  const pathname = usePathname();
  const { getMenuForRole } = useNavigation();
  const { getProjectPath } = useProjectRoutes();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const menuSections = getMenuForRole();

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((current) =>
      current.includes(sectionTitle)
        ? current.filter((title) => title !== sectionTitle)
        : [...current, sectionTitle]
    );
  };

  return (
    <div className="space-y-4">
      {menuSections.map((section) => (
        <div key={section.title}>
          <h3 className="px-3 text-sm font-semibold text-sidebar-foreground/70">
            {section.title}
          </h3>
          <div className="mt-2 space-y-1">
            {section.items.map((item) => (
              item.children ? (
                <Collapsible
                  key={item.id}
                  open={openSections.includes(item.id)}
                  onOpenChange={() => toggleSection(item.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        openSections.includes(item.id) && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <div className="flex items-center">
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openSections.includes(item.id) && "rotate-180"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-8 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          pathname === child.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}