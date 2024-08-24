import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import Model from "./model-selection";

export default function Nav() {

  return (
    <div className="lg:mb-[5%] md:mb-[10%]">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200 pb-4">
        <div className="grid grid-cols-2 pt-6 mx-auto pl-8 pr-8">
          <div className="flex space-x-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-[12px] border-grey-400 flex items-center"
                >
                  <div className="flex space-x-2 items-center">
                    <div className="mx-auto font-bold">File</div>
                    <ChevronDown size={20} className="text-slate-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-8">
                <DropdownMenuItem>Upload File</DropdownMenuItem>
                <DropdownMenuItem>Download File</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Model />
          </div>
          <Button
            variant="outline"
            className="relative h-10 w-10 rounded-full justify-self-end p-0"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
