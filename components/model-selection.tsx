import React from "react";
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

import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function Model() {
  const [model, setModel] = React.useState("Select Model");
  const [apiKey, setApiKey] = React.useState("");

  const handleModelChange = (value: any) => {
    setModel(value);
  };

  const submitModelandApi = () => {
    console.log(apiKey);
    console.log(model);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="rounded-[12px] flex items-center font-bold"
            variant={"outline"}
          >
            <div className="mx-auto">{model}</div>
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
              <SelectItem value="OpenAI GPT-3">OpenAI GPT-3</SelectItem>
              <SelectItem value="OpenAI GPT-4">OpenAI GPT-4</SelectItem>
              <SelectItem value="Claude Sonnet">Claude</SelectItem>
              <SelectItem value="Mistral">Mistral</SelectItem>
              <SelectItem value="Llama">Llama</SelectItem>
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
              <Button onClick={submitModelandApi} className="rounded-[12px]">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
