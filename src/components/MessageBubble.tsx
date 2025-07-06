
import { Heart, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end items-start gap-3 animate-fade-in">
        <div className="flex flex-col items-end max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 px-2">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <Heart className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col max-w-xs lg:max-w-md xl:max-w-lg">
        <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-teal-100">
          <p className="text-sm leading-relaxed text-gray-800">{message.text}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
