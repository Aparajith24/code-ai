import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Code from "./code-editor";
import Output from "./output-area";

const EditorArea = () => {
  return (
    <div className="ml-[1%] mr-[1%]">
      <ResizablePanelGroup direction="horizontal"  className="min-h-[80vh]  rounded-lg border md:min-w-[450px]">
        <ResizablePanel defaultSize={70}><Code/></ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30}><Output/></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorArea;
