import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Code from "./code-editor";
import { Button } from "@/components/ui/button";
import { ChevronDown, Save, Upload, User, Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserOptions from "./user-options";
import { Input } from "./ui/input";

const EditorArea = () => {
  const [editorValue, setEditorValue] = React.useState(
    "# Write your code here",
  );
  const [language, setLanguage] = React.useState("python");
  const [output, setOutput] = React.useState("");
  const [model, setModel] = React.useState("Select Model");
  const [apiKey, setApiKey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleModelChange = (value: any) => {
    setModel(value);
  };

  const submitModelandApi = () => {
    console.log(apiKey);
    console.log(model);
  };

  //Function to execute the code
  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: editorValue, language }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error executing code");
    }
    setLoading(false);
  };

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

  const handleCodeDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editorValue], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    if(language === "python"){
      element.download = "code.py";
    }
    else if(language === "javascript"){
      element.download = "code.js";
    }
    else if(language === "typescript"){
      element.download = "code.ts";
    }
    else if(language === "java"){
      element.download = "code.java";
    }
    else if(language === "c"){
      element.download = "code.c";
    }
    else if(language === "cpp"){
      element.download = "code.cpp";
    }
    else if(language === "go"){
      element.download = "code.go";
    }
    else if(language === "nodejs"){
      element.download = "code.js";
    }
    else if(language === "typescript"){
      element.download = "code.ts";
    }
    else if(language === "plaintext"){
      element.download = "code.txt";
    }
    else{
      element.download = "code";
    }
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
      {/*UI for the top bar of the editor */}
      <div className="lg:mb-[5%] md:mb-[10%]">
        <div className="fixed top-0 left-0 right-0 z-10 border-b pb-2">
          <div className="grid grid-cols-2 pt-3 mx-auto pl-8 pr-8">
            <div className="flex space-x-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="rounded-[12px] border-grey-400 flex items-center text-white bg-blue-700"
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
                    className="flex items-center cursor-pointer text-sm hover:cursor-pointer mb-2 "
                  >
                    <Upload className="h-4 w-4 mr-2" /> Upload Code
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <DropdownMenuSeparator />
                  <label
                    htmlFor="save"
                    className="flex items-center cursor-pointer text-sm hover:cursor-pointer"
                    onClick={handleCodeDownload}
                  >
                    <Save className="h-4 w-4 mr-2" /> Download Code
                  </label>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="rounded-[12px] flex items-center font-bold"
                      variant={"outline"}
                    >
                      <div className="flex space-x-2 items-center">
                      <Bot size={20} className="text-slate-400" />
                      <div className="mx-auto">{model}</div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[30vw]">
                    <DialogHeader>
                      <DialogTitle>
                        Please Select Your Model and Enter your API Key
                      </DialogTitle>
                    </DialogHeader>
                    <Select onValueChange={handleModelChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">
                          OpenAI GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value="gpt-4o">OpenAI GPT-4o</SelectItem>
                        <SelectItem value="gpt-4o-mini">
                          OpenAI GPT-4o Mini
                        </SelectItem>
                        <SelectItem value="gpt-4-turbo">
                          OpenAI GPT-4 Turbo
                        </SelectItem>
                        <SelectItem value="gpt-4">OpenAI GPT-4</SelectItem>
                        <SelectItem value="gemini-1.5-flash">
                          Gemini-1.5-Flash
                        </SelectItem>
                        <SelectItem value="Claude 3.5 Sonnet">
                          Claude 3.5 Sonnet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      aria-label="API Key"
                      placeholder="API Key"
                      className="w-full"
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={submitModelandApi}
                          className="rounded-[12px]"
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <UserOptions />
          </div>
        </div>
      </div>
      {/*UI for Code Editor and the Output place */}
      <div className="ml-[1%] mr-[1%]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[78vh]  rounded-lg border border-4 md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={70}>
            <Code
              editorValue={editorValue}
              setEditorValue={handleSetEditorValue}
              language={language}
              setLanguage={setLanguage}
              executeCode={executeCode}
              model={model}
              apiKey={apiKey}
            />
          </ResizablePanel>
          <ResizableHandle className="border-2"/>
          <ResizablePanel defaultSize={30}>
            <div className="mt-2">
              <div className="flex space-x-5 border-b-4 mb-5">
                <h1 className="ml-5 mb-5 text-xl font-bold">Output</h1>
              </div>
              {loading ? (
                <div className="ml-5">
                  <p>Executing...</p>
                </div>
              ) : (
                <div className="ml-5">
                  <p>{output}</p>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        
      </div>
    </>
  );
};

export default EditorArea;
