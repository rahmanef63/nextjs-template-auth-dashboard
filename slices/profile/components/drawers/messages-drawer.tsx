import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "shared/components/ui/drawer";
import { ScrollArea } from "shared/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "shared/components/ui/avatar";
import { Input } from "shared/components/ui/input";
import { Button } from "shared/components/ui/button";
import { Card } from "shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/components/ui/tabs";
import { Search, MessageSquare } from "lucide-react";

export function MessagesDrawer() {
  const messages = {
    direct: [
      {
        id: 1,
        sender: "Alice Smith",
        avatar: "/avatars/alice.jpg",
        message: "Hey, can we discuss the project?",
        time: "10:30 AM",
        unread: true
      },
      {
        id: 2,
        sender: "Bob Johnson",
        avatar: "/avatars/bob.jpg",
        message: "The designs look great!",
        time: "Yesterday",
        unread: false
      }
    ],
    team: [
      {
        id: 3,
        sender: "Design Team",
        avatar: "/avatars/design-team.jpg",
        message: "Weekly design review starting soon",
        time: "2h ago",
        unread: true
      }
    ]
  };

  return (
    <Drawer>
      <DrawerTrigger className="hidden" data-drawer-trigger="messages">
        Open Messages
      </DrawerTrigger>
      <DrawerContent className="max-w-[90%] w-full sm:max-w-[540px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>Messages</DrawerTitle>
          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </DrawerHeader>
        <div className="p-6">
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">Direct Messages</TabsTrigger>
              <TabsTrigger value="team">Team Chats</TabsTrigger>
            </TabsList>
            {Object.entries(messages).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {items.map((message) => (
                      <Card key={message.id} className="p-4 hover:bg-accent cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium">{message.sender}</h4>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                          </div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-4">
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}