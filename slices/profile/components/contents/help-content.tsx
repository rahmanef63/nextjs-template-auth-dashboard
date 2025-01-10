"use client"

import { Search, Book, MessageCircle, FileText } from "lucide-react";
import { Input } from "shared/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "shared/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "shared/components/ui/accordion";

export function HelpContent() {
  const faqItems = [
    {
      question: "How do I change my password?",
      answer: "Go to Settings > Security to change your password."
    },
    {
      question: "Where can I find my team settings?",
      answer: "Team settings are available in the Team Switcher dropdown at the top of the sidebar."
    },
    {
      question: "How do I invite team members?",
      answer: "You can invite team members from the Team Management section in your dashboard."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of using the platform",
      icon: Book
    },
    {
      title: "Team Collaboration",
      description: "Best practices for working with your team",
      icon: MessageCircle
    },
    {
      title: "Documentation",
      description: "Detailed technical documentation",
      icon: FileText
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search help articles..." className="pl-8" />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>
        <TabsContent value="faq" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="guides" className="space-y-4">
          {guides.map((guide, index) => (
            <Card key={index} className="cursor-pointer hover:bg-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <guide.icon className="h-5 w-5" />
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {guide.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Need more help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for? Contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
