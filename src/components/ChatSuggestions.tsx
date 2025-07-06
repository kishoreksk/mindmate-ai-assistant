
import { Button } from "@/components/ui/button";
import { Calendar, HelpCircle, FileText } from "lucide-react";

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions = ({ onSuggestionClick }: ChatSuggestionsProps) => {
  const suggestions = [
    {
      text: "Schedule Appointment",
      icon: Calendar,
      action: "schedule-appointment"
    },
    {
      text: "What services do you offer?",
      icon: HelpCircle,
      action: "services"
    },
    {
      text: "Mental Health Resources",
      icon: FileText,
      action: "mental-health-resources"
    }
  ];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {suggestions.map((suggestion, index) => {
        const IconComponent = suggestion.icon;
        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion.action)}
            className="flex items-center gap-2 bg-white/90 border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-gray-700"
          >
            <IconComponent className="w-4 h-4" />
            {suggestion.text}
          </Button>
        );
      })}
    </div>
  );
};

export default ChatSuggestions;
