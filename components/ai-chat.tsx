import { Sparkles } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AIChat = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="relative h-10 w-10 rounded-full justify-self-end p-0 mt-1 ml-[58vh]">
            <Sparkles className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Talk to AI</SheetTitle>
            <SheetDescription>Chat with AI to get some help</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AIChat;
