import React, { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

interface CodeProps {
  editorValue: string;
  setEditorValue: (value: string) => void;
}

const Code = ({ editorValue, setEditorValue }: CodeProps) => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("Light");
  const [selectedCode, setSelectedCode] = useState("");
  const [modelOpen, setModelOpen] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setEditorValue(getCommentSyntax(value) + " Write your code here");
  };

  const handleThemeChange = (value: string) => {
    if (value === "Light") {
      setTheme("light");
    } else if (value === "Dark") {
      setTheme("vs-dark");
    }
  };

  const getCommentSyntax = (lang: string) => {
    switch (lang) {
      case "python":
        return "#";
      case "c":
      case "java":
      case "cpp":
        return "//";
      default:
        return "#";
    }
  };

  const handleEditorMount = (editor: any) => {
    editor.addAction({
      id: "1",
      label: "Refactor with AI",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
        monaco.KeyMod.chord(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM,
        ),
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function (ai: any) {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        setSelectedCode(selectedText);
        setModelOpen(true);
      },
    });
  };

  return (
    <div className="mt-2">
      <div className="flex space-x-5 border-b mb-5">
        <div className="ml-5">
          <Select onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] rounded-[12px] font-bold">
              <SelectValue placeholder={language} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-5">
          <Select onValueChange={handleThemeChange}>
            <SelectTrigger className="w-[180px] rounded-[12px] font-bold">
              <SelectValue placeholder={theme} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="ml-5 mb-2">Run</Button>
      </div>
      <Editor
        height="78vh"
        language={language}
        value={editorValue}
        theme={theme}
        onChange={(value) => {
          setEditorValue(value || "");
          setTheme(theme);
        }}
        onMount={handleEditorMount}
      />
      {modelOpen && (
        <Dialog open={modelOpen} onOpenChange={setModelOpen}>
          <DialogContent className="lg:w-[85vw] h-[90vh] md:w-[90vw] md:overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Refactor with AI</DialogTitle>
              <DialogDescription>
                Refactor the selected code with AI
              </DialogDescription>
            </DialogHeader>
            <div className="p-5 lg:grid lg:grid-cols-2 lg:space-x-5">
              <div className="mt-5">
                <p className="text-lg font-bold">Selected Code</p>
                <div className="max-h-[60vh] overflow-y-auto border p-2 bg-gray-100 rounded-md">
                  <pre className="text-sm">{selectedCode}</pre>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-lg font-bold">Refactored Code</p>
                <div className="max-h-[60vh] overflow-y-auto border p-2 bg-gray-100 rounded-md">
                  <pre className="text-sm">{selectedCode}</pre>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => setModelOpen(false)}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Code;
