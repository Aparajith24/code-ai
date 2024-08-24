import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Code = () => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("Light");
  const [editorValue, setEditorValue] = useState("# Write your code here");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setEditorValue(getCommentSyntax(value) + " Write your code here");
  };

  const handleThemeChange = (value: string) => {
    if(value === "Light"){
        setTheme("light");
    }
    else if(value === "Dark"){
        setTheme("vs-dark");
    }
  }

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
        height="80vh"
        language={language}
        value={editorValue}
        theme={theme}
        onChange={
            (value) => {
                setEditorValue(value || "");
                setTheme(theme);
            }
        }
      />
    </div>
  );
};

export default Code;