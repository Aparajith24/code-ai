import React, { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import AIChat from "./ai-chat";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { RefactorCode } from "./refactor-code";

interface CodeProps {
  editorValue: string;
  setEditorValue: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  executeCode: () => void;
  apiKey: string;
  model: string;
}

const Code = ({
  editorValue,
  setEditorValue,
  language,
  setLanguage,
  executeCode,
  apiKey,
  model,
}: CodeProps) => {
  const [selectedCode, setSelectedCode] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [editorTheme, setEditorTheme] = useState(
    resolvedTheme == "dark" ? "vs-dark" : "light",
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const prompt = `You’re an expert software engineer with over 15 years of experience in optimizing code for performance, readability, and maintainability. Your extensive knowledge of various programming languages and best practices allows you to transform existing code into more efficient and elegant solutions.

  Your task is to take the following code snippet and enhance it:
  \`\`\`
  ${selectedCode}
  \`\`\`

  Focus on the following key areas:

  1. **Performance**: Optimize the code to run faster by implementing efficient algorithms and data structures.
  2. **Readability**: Refactor the code to be more concise and easier to understand, using clear naming conventions and reducing complexity where possible.
  3. **Best Practices**: Apply current coding standards and best practices, ensuring the code is maintainable and follows conventions.

  As you enhance the code, keep the following considerations in mind:
  - Maintain the original functionality of the code.
  - Include clear and concise comments throughout to explain your improvements and thought process.
  - If any libraries or frameworks could enhance the functionality or efficiency, suggest those as well.

  Please provide only the improved code snippet without any additional information or context.

  `;

  const executeai = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          model: model,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setOutput(data.choices[0].message.content);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error executing code");
    }
  };

  const executegeminiai = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
      setOutput(data.candidates[0].content.parts[0].text);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error executing code");
    }
  };

  React.useEffect(() => {
    setEditorTheme(resolvedTheme === "dark" ? "vs-dark" : "light");
  }, [resolvedTheme]);

  //handles the default comment syntax for the selected language
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setEditorValue(getCommentSyntax(value) + " Write your code here");
  };

  //handles the theme change
  const handleThemeChange = (value: string) => {
    if (value === "Light") {
      setEditorTheme("light");
    } else if (value === "Dark") {
      setEditorTheme("vs-dark");
    }
  };

  //function to get the comment syntax for the selected language
  const getCommentSyntax = (lang: string) => {
    switch (lang) {
      case "python":
        return "#";
      case "c":
        return "//";
      case "java":
        return "//";
      case "cpp":
        return "//";
      default:
        return "#";
    }
  };

  //custom actoin to refactor the selected code with AI
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
    editor.addAction({
      id: "2",
      label: "Show Git Diff",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
        monaco.KeyMod.chord(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG,
        ),
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 2.5,
      run: function (ai: any) {
        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);
        setSelectedCode(selectedText);
        setModelOpen(true);
      },
    });
  };

  const acceptchanges = (value: string) => {
    setEditorValue(value);
    setModelOpen(false);
    setOutput("");
  };

  const declinechanges = () => {
    setModelOpen(false);
    setOutput("");
  };

  return (
    <>
    <div className="mt-2">
      <div className="flex space-x-5 border-b mb-5">
        <div className="ml-5">
          {/* Top Bar in the editor */}
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
              <SelectValue
                placeholder={editorTheme == "vs-dark" ? "Dark" : "Light"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="ml-5 mb-2" onClick={executeCode}>
          Run
        </Button>
      </div>
      {/* Editor component */}
      <Editor
        height="78vh"
        language={language}
        value={editorValue}
        theme={editorTheme}
        onChange={(value) => {
          setEditorValue(value || "");
        }}
        onMount={handleEditorMount}
      />
      {/* Dialog component for Refactor with AI */}
      {modelOpen && (
        <RefactorCode
          selectedCode={selectedCode}
          modelOpen={modelOpen}
          setModelOpen={setModelOpen}
          executeai={executeai}
          executegeminiai={executegeminiai}
          output={output}
          isLoading={loading}
          accept={acceptchanges}
          decline={declinechanges}
          AImodel={model}
        />
      )}
    </div>
    <div className="mt-[-7vh] lg:ml-[65vw] md:ml-[40vw]">
    <AIChat code={selectedCode} model={model} apiKey={apiKey} editorValue={editorValue}/>
  </div>
  </>
  );
};

export default Code;
