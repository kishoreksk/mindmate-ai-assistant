
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className="resize-none border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl bg-white/90 backdrop-blur-sm"
          autoFocus
        />
      </div>
      <Button
        type="submit"
        disabled={!input.trim()}
        className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
