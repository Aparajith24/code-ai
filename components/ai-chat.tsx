"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, ClipboardCopy } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  code: string;
  model: string;
  apiKey: string;
  editorValue: string;
  setEditorValue: (value: string) => void;
  setModelOpen: (isOpen: boolean) => void;
  modelOpen: boolean;
  usingHelp: boolean;
  setUsingHelp: (usingHelp: boolean) => void;
}

export default function AIChat({ code, model, apiKey, editorValue, setEditorValue, setModelOpen, modelOpen, usingHelp, setUsingHelp }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSetEditorValue = (codeContent: string) => {
    setEditorValue(codeContent);
  };

  useEffect(() => {
    if (usingHelp) {
      setInput(code);
    }
  }, [usingHelp, code]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const handleSlashCommands = (input: string): string | false => {
      const command = input.trim().toLowerCase();
    
      switch (command) {
        case "/code":
          return `You’re a seasoned software developer with over 15 years of experience in multiple programming languages. You have a knack for breaking down complex code into understandable features, syntax, and practical applications. Your ability to simplify technical concepts makes you an invaluable resource for both novice and experienced programmers alike.\n\nYour task is to analyze and explain the following code snippet. Here is the code:\n\n${editorValue}\n\nPlease detail the main features of the code, explain its syntax, and describe potential use cases for this code in real-world applications. Keep in mind the audience may have varying levels of programming knowledge, so ensure your explanation is clear and accessible.`;
        default:
          return false;
      }
    };

    const slashCommandResult = handleSlashCommands(input);
    const prompt = slashCommandResult !== false ? slashCommandResult : `${code}\n\nUser: ${input}`;

    try {
      if (model.toLowerCase().includes("gpt")) {
        await executeOpenAI(prompt);
      } else if (model.toLowerCase().includes("gemini")) {
        await executeGeminiAI(prompt);
      } else {
        throw new Error("Unsupported model");
      }
    } catch (error) {
      console.error("Error:", error);
      if(apiKey === "") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Please enter your API key and select a model to continue.",
          }
        ]);
      } else{
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    }
    } finally {
      setIsLoading(false);
    }
  };

  const executeOpenAI = async (prompt: string) => {
    const response = await fetch("https://code-ai-backend.onrender.com/openaichat", {
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
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.choices[0].message.content },
    ]);
  };

  const executeGeminiAI = async (prompt: string) => {
    const response = await fetch("https://code-ai-backend.onrender.com/geminichat", {
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
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.candidates[0].content.parts[0].text },
    ]);
  };

  return (
    <>
      <Button
        onClick={() => setModelOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full p-0 bg-gradient-to-r from-cyan-500 to-blue-500"
        aria-label="Open AI Chat"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
      <AnimatePresence>
      {modelOpen && (
        <motion.div
        className="fixed inset-y-0 right-0 w-3/4 bg-background border-l border-border shadow-xl flex flex-col z-50"
        variants={chatVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <Button
              onClick={() =>{
                setModelOpen(false);
                setUsingHelp(false);
              } }
              variant="ghost"
              size="icon"
              aria-label="Close AI Chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-black dark:text-white"
                      : "bg-muted text-black dark:text-white"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      code({ node, className, children,ref, style, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <div className="relative">
                            <SyntaxHighlighter
                              style={atomDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                            <Button
                              onClick={() => handleSetEditorValue(String(children))}
                              className="absolute top-2 right-2"
                              size="icon"
                              variant="outline"
                            >
                              <ClipboardCopy className="h-4 w-4 bg-transparent" />
                              <span className="sr-only">Set editor value</span>
                            </Button>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                    className="prose dark:prose-invert max-w-none"
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-muted">
                  <span className="inline-block animate-pulse">
                    <span className="dots">...</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t flex items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow resize-none min-h-[40px] max-h-[200px]"
              disabled={isLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="ml-2 mb-[3px]"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
