import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Model() {
  const [language, setLanguage] = React.useState("Select Language");
  const handleLanguageChange = (value: any) => {
    setLanguage(value);
  };
  return (
    <>
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px] rounded-[12px] font-bold">
          <SelectValue placeholder={language}  />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Python">Python</SelectItem>
          <SelectItem value="C">C</SelectItem>
          <SelectItem value="JavaScript">JavaScript</SelectItem>
          <SelectItem value="Java">Java</SelectItem>
          <SelectItem value="C++">C++</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
