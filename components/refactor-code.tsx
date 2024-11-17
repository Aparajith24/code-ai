import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


interface RefactorCodeProps {
  modelOpen: boolean;
  setModelOpen: (isOpen: boolean) => void;
  executeai: () => void;
  executegeminiai: () => void;
  selectedCode: string;
  output: string;
  isLoading: boolean;
  accept: (value: string) => void;
  decline: () => void;
  AImodel: string;
}

export const RefactorCode = ({
  modelOpen,
  setModelOpen,
  executeai,
  selectedCode,
  output,
  isLoading,
  accept,
  decline,
  AImodel,
  executegeminiai,
}: RefactorCodeProps) => {
  const renderMarkdownWithHighlighting = (code: string) => (
    <ReactMarkdown
    children={code}
    components={{
      code({ className, children,style, ref, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  />
  );

  return (
    <>
      <Dialog open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent className="lg:w-[85vw] h-[90vh] md:w-[90vw] md:overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Refactor with AI</DialogTitle>
            <DialogDescription>
              Refactor the selected code with AI
            </DialogDescription>
          </DialogHeader>
          {output.length !== 0 && !isLoading ? (
            <div className="p-5 lg:grid lg:grid-cols-2 lg:space-x-5">
              <div>
                <p className="text-lg font-bold">Selected Code</p>
                <div className="max-h-[60vh] overflow-y-auto border p-2 rounded-md">
                  {renderMarkdownWithHighlighting(selectedCode)}
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">Refactored Code</p>
                <div className="max-h-[60vh] overflow-y-auto border p-2 rounded-md">
                  {renderMarkdownWithHighlighting(output)}
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="p-5 lg:grid lg:grid-cols-2 lg:space-x-5">
              <div>
                <p className="text-lg font-bold">Selected Code</p>
                <div className="max-h-[60vh] overflow-y-auto border p-2 rounded-md">
                  {renderMarkdownWithHighlighting(selectedCode)}
                </div>
              </div>
              <div className="mt-5 flex flex-col items-center justify-center">
                <p className="text-lg font-bold">Refactoring...</p>
                <div className="flex items-center justify-end text-center">
                  <Loader2 className="animate-spin h-8 w-8" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <p className="text-lg font-bold">Selected Code</p>
              <div className="max-h-[60vh] overflow-y-auto border p-2 rounded-md">
                {renderMarkdownWithHighlighting(selectedCode)}
              </div>
            </div>
          )}
          <DialogFooter>
            {output.length !== 0 ? (
              <div className="flex space-x-5">
                <Button onClick={() => accept(output)} className="bg-green-400">
                  Accept
                </Button>
                <Button onClick={decline} className="bg-red-400">
                  Decline
                </Button>
              </div>
            ) : (
              <div className="flex space-x-5">
                <Button
                  onClick={
                    AImodel === "gemini-1.5-flash"
                      ? executegeminiai
                      : executeai
                  }
                >
                  Refactor
                </Button>
                <Button onClick={() => setModelOpen(false)}>Cancel</Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
