import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Code from "./code-editor";
import AIChat from "./ai-chat";
import { Button } from "@/components/ui/button";
import { ChevronDown, Save, Upload, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Model from "./model-selection";

const EditorArea = () => {
  const [editorValue, setEditorValue] = React.useState(
    "# Write your code here",
  );

  //Function to handle the file upload and read the content of the file
  const handleFileRead = async (file: any) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target && typeof e.target.result === "string") {
        const content = e.target.result;
        try {
          setEditorValue(content);
        } catch (error) {
          console.error("Error creating new notebook:", error);
        }
      }
    };
    reader.onerror = (e) => {
      if (e.target) {
        console.error("Error reading file:", e.target.error);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleFileRead(file);
  };

  //Function to set the value of the editor
  const handleSetEditorValue = (value: string) => {
    setEditorValue(value);
  };

  return (
    <>
      {/*UI for the top bar of the editor */}
      <div className="lg:mb-[5%] md:mb-[10%]">
        <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200 pb-2">
          <div className="grid grid-cols-2 pt-3 mx-auto pl-8 pr-8">
            <div className="flex space-x-5">
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
                <DropdownMenuContent className="ml-8 p-4">
                  <label
                    htmlFor="file-input"
                    className="flex items-center cursor-pointer text-sm hover:cursor-pointer mb-2 hover:bg-gray-100"
                  >
                    <Upload className="h-4 w-4 mr-2" /> Upload Code
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <label
                    htmlFor="save"
                    className="flex items-center cursor-pointer text-sm hover:cursor-pointer hover:bg-gray-100"
                  >
                    <Save className="h-4 w-4 mr-2" /> Download Code
                  </label>
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
      {/*UI for Code Editor and the Output place */}
      <div className="ml-[1%] mr-[1%]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[78vh]  rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={70}>
            <Code
              editorValue={editorValue}
              setEditorValue={handleSetEditorValue}
            />
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
