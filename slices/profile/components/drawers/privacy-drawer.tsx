import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "shared/components/ui/drawer";
import { Switch } from "shared/components/ui/switch";
import { Label } from "shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "shared/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "shared/components/ui/accordion";
import { Alert, AlertDescription } from "shared/components/ui/alert";
import { Button } from "shared/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

export function PrivacyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger className="hidden" data-drawer-trigger="privacy">
        Open Privacy Settings
      </DrawerTrigger>
      <DrawerContent className="max-w-[90%] w-full sm:max-w-[540px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>Privacy Settings</DrawerTitle>
        </DrawerHeader>
        <div className="p-6 space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These settings help control your visibility and data usage across the platform.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Visibility Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to other team members
                  </p>
                </div>
                <Switch id="profile-visibility" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="activity-status">Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show when you're active
                  </p>
                </div>
                <Switch id="activity-status" />
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="data-usage">
              <AccordionTrigger>Data Usage & Privacy</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect usage data to improve your experience
                    </p>
                  </div>
                  <Switch id="data-collection" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="personalization">Personalization</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized recommendations
                    </p>
                  </div>
                  <Switch id="personalization" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="communication">
              <AccordionTrigger>Communication Preferences</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications
                    </p>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional emails
                    </p>
                  </div>
                  <Switch id="marketing-emails" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset Defaults</Button>
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Save Privacy Settings
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}