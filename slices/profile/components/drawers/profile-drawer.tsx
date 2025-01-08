import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "shared/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "shared/components/ui/avatar";
import { useAuth } from "shared/hooks/useAuth";
import { Badge } from "shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "shared/components/ui/card";
import { Button } from "shared/components/ui/button";
import { Input } from "shared/components/ui/input";
import { Label } from "shared/components/ui/label";
import { Separator } from "shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/components/ui/tabs";
import { User, Settings, Mail, Phone } from "lucide-react";

export function ProfileDrawer() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Drawer>
      <DrawerTrigger className="hidden" data-drawer-trigger="profile">
        Open Profile
      </DrawerTrigger>
      <DrawerContent className="max-w-[90%] w-full sm:max-w-[540px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>Profile Settings</DrawerTitle>
        </DrawerHeader>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={user.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span>January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Type</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input defaultValue="English (US)" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Input defaultValue="UTC-8 (Pacific Time)" />
                  </div>
                  <Button className="w-full">Update Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}