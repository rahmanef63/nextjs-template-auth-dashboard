import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "shared/components/ui/drawer";
import { ScrollArea } from "shared/components/ui/scroll-area";
import { Badge } from "shared/components/ui/badge";
import { Button } from "shared/components/ui/button";
import { Card } from "shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/components/ui/tabs";
import { Bell, Info, AlertCircle, CheckCircle } from "lucide-react";

export function NotificationsDrawer() {
  const notifications = {
    all: [
      { id: 1, title: "New project assigned", description: "You've been assigned to Project X", time: "5m ago", type: "info" },
      { id: 2, title: "Meeting reminder", description: "Team meeting in 30 minutes", time: "1h ago", type: "reminder" },
      { id: 3, title: "Task completed", description: "Design review has been completed", time: "2h ago", type: "success" },
    ],
    unread: [
      { id: 1, title: "New project assigned", description: "You've been assigned to Project X", time: "5m ago", type: "info" },
    ],
    mentions: [
      { id: 2, title: "Meeting reminder", description: "Team meeting in 30 minutes", time: "1h ago", type: "reminder" },
    ],
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "reminder":
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="hidden" data-drawer-trigger="notifications">
        Open Notifications
      </DrawerTrigger>
      <DrawerContent className="max-w-[90%] w-full sm:max-w-[540px] mx-auto">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Notifications</DrawerTitle>
          <Button variant="outline" size="sm">Mark all as read</Button>
        </DrawerHeader>
        <div className="p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">{notifications.all.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge variant="secondary" className="ml-2">{notifications.unread.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="mentions">
                Mentions
                <Badge variant="secondary" className="ml-2">{notifications.mentions.length}</Badge>
              </TabsTrigger>
            </TabsList>
            {Object.entries(notifications).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {items.map((notification) => (
                      <Card key={notification.id} className="p-4">
                        <div className="flex items-start space-x-4">
                          {getIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <span className="text-xs text-muted-foreground mt-1 block">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}