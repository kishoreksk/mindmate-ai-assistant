
import { useState, useEffect, useRef } from "react";
import { Heart, X } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ChatSuggestions from "./ChatSuggestions";
import AppointmentForm from "./AppointmentForm";
import PatientHealthQuestionnaire from "./PatientHealthQuestionnaire";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MindMate, your AI companion from Soulklinic. I'm here to provide 24/7 support and guidance for your mental wellness journey. While I can offer coping strategies and emotional support, please remember that I'm not a replacement for professional psychiatric care. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showHealthQuestionnaire, setShowHealthQuestionnaire] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for crisis-related keywords
    if (lowerMessage.includes('suicide') || lowerMessage.includes('hurt myself') || lowerMessage.includes('end it all')) {
      return "I'm very concerned about what you've shared. Your safety is the top priority. Please reach out to a crisis helpline immediately: National Suicide Prevention Lifeline at 988 or contact emergency services at 911. You can also reach out to Soulklinic's emergency support. You don't have to go through this alone.";
    }
    
    // Check for services inquiry
    if (lowerMessage.includes('services') || lowerMessage.includes('what do you offer')) {
      return "Soulklinic offers comprehensive mental health services including: Individual Therapy, Group Therapy, Psychiatric Consultations, Crisis Intervention, Telepsychiatry Sessions, Cognitive Behavioral Therapy (CBT), Depression & Anxiety Treatment, Trauma-Informed Care, and 24/7 AI Support through MindMate. We also provide specialized programs for PTSD, addiction recovery, and family counseling. Would you like to schedule an appointment or learn more about any specific service?";
    }
    
    // Check for anxiety-related content
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic') || lowerMessage.includes('worried')) {
      return "I understand you're experiencing anxiety, which can be very overwhelming. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. This can help activate your body's relaxation response. Would you like me to guide you through some other grounding techniques, or would you prefer to discuss what's contributing to your anxiety?";
    }
    
    // Check for depression-related content
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') || lowerMessage.includes('empty')) {
      return "I hear that you're going through a difficult time. Depression can make everything feel overwhelming and exhausting. Remember that these feelings, while very real and valid, are temporary. Small steps can make a difference - even getting some sunlight or taking a short walk can help. Have you been able to maintain any daily routines, or would you like suggestions for gentle self-care activities?";
    }
    
    // Check for stress-related content
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Stress can really take a toll on both your mental and physical wellbeing. It sounds like you're dealing with a lot right now. Let's work on breaking things down into manageable pieces. What feels like the most pressing concern you're facing? Sometimes talking through priorities can help reduce that overwhelming feeling.";
    }
    
    // Default supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. It takes courage to open up about how you're feeling. I'm here to listen and support you through this.",
      "I appreciate you trusting me with your thoughts. Your mental health matters, and taking time to check in with yourself is an important step.",
      "It sounds like you have a lot on your mind. I'm here to help you work through these feelings at your own pace.",
      "I want you to know that your feelings are valid and you're not alone in this journey. Let's explore what might be most helpful for you right now.",
      "Taking the step to reach out shows real strength. I'm here to provide support and guidance as you navigate these challenges."
    ];
    
    const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    return `${randomResponse} If you feel you need immediate professional support, please don't hesitate to contact Soulklinic directly or speak with a mental health professional.`;
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay (shorter for medical context)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSuggestionClick = (action: string) => {
    switch (action) {
      case 'schedule-appointment':
        setShowAppointmentForm(true);
        break;
      case 'services':
        handleSendMessage("What services do you offer?");
        break;
      case 'mental-health-resources':
        setShowHealthQuestionnaire(true);
        break;
      default:
        break;
    }
  };

  const handleAppointmentSubmit = (data: any) => {
    console.log('Appointment data:', data);
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `Thank you ${data.firstName}! Your appointment request for ${data.appointmentDate} at ${data.appointmentTime} has been received. Our team will contact you within 24 hours to confirm your appointment. If you need immediate assistance, please call our emergency line.`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  const handleQuestionnaireSubmit = (data: any) => {
    console.log('Questionnaire data:', data);
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `Thank you for completing your health questionnaire, ${data.firstName}. This information will help our clinical team provide you with the most appropriate care. Based on your responses, we recommend scheduling a consultation with one of our mental health professionals. Would you like me to help you schedule an appointment?`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-teal-200/50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">MindMate AI Assistant</h1>
            <p className="text-sm text-teal-600">Soulklinic • 24/7 Mental Health Support</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 bg-amber-50 p-2 rounded-md border border-amber-200">
          <strong>Disclaimer:</strong> This AI assistant provides support and guidance but is not a substitute for professional medical advice, diagnosis, or treatment.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-teal-50/30 via-blue-50/30 to-indigo-50/30">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-teal-100 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input with Suggestions */}
      <div className="p-4 bg-white/70 backdrop-blur-sm border-t border-teal-200/50">
        <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {/* Appointment Form Dialog */}
      <Dialog open={showAppointmentForm} onOpenChange={setShowAppointmentForm}>
        <DialogContent className="max-w-md">
          <AppointmentForm
            onClose={() => setShowAppointmentForm(false)}
            onSubmit={handleAppointmentSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Health Questionnaire Dialog */}
      <Dialog open={showHealthQuestionnaire} onOpenChange={setShowHealthQuestionnaire}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <PatientHealthQuestionnaire
            onClose={() => setShowHealthQuestionnaire(false)}
            onSubmit={handleQuestionnaireSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatInterface;
