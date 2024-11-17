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
      const response = await fetch("https://code-ai-backend.onrender.com/execute", {
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
    <div className="flex flex-col h-screen">
      <header className="border-b p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-md border-gray-400 bg-blue-700 text-white">
                <span className="font-bold mr-2">File</span>
                <ChevronDown size={20} className="text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <label htmlFor="file-input" className="flex items-center cursor-pointer text-sm mb-2">
                <Upload className="h-4 w-4 mr-2" /> Upload Code
                <input type="file" id="file-input" onChange={handleFileChange} className="hidden" />
              </label>
              <DropdownMenuSeparator />
              <button onClick={handleCodeDownload} className="flex items-center cursor-pointer text-sm">
                <Save className="h-4 w-4 mr-2" /> Download Code
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-md">
                <Bot size={20} className="text-slate-400 mr-2" />
                <span className="font-bold">{model}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select Model and Enter API Key</DialogTitle>
              </DialogHeader>
              <Select onValueChange={handleModelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">OpenAI GPT-4</SelectItem>
                  <SelectItem value="gemini-1.5-flash">Gemini-1.5-Flash</SelectItem>
                  <SelectItem value="claude-3.5-sonnet">Claude 3.5 Sonnet</SelectItem>
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
                  <Button onClick={submitModelandApi} className="rounded-md">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <UserOptions />
      </header>
      <main className="flex-grow overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={70} minSize={30}>
            <Code
              editorValue={editorValue}
              setEditorValue={setEditorValue}
              language={language}
              setLanguage={setLanguage}
              executeCode={executeCode}
              model={model}
              apiKey={apiKey}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full overflow-auto p-4">
              <h2 className="text-xl font-bold mb-4">Output</h2>
              {loading ? (
                <p>Executing...</p>
              ) : (
                <pre className="whitespace-pre-wrap">{output}</pre>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  )
}

export default EditorArea;
