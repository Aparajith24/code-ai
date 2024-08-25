import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Code from "./code-editor";
import AIChat from "./ai-chat";

const EditorArea = () => {
  return (
    <>
      <div className="ml-[1%] mr-[1%]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[78vh]  rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={70}>
            <Code />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <div className="mt-2">
              <div className="flex space-x-5 border-b mb-5">
                <h1 className="ml-5 mb-5 text-xl font-bold">Output</h1>
              </div>
              <div>
                <p>Output will be displayed here</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="mt-[-7vh] lg:ml-[68vw] md:ml-[40vw]">
          <AIChat />
        </div>
      </div>
    </>
  );
};

export default EditorArea;
