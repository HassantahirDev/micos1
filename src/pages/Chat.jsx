import React, { useState, useRef, useEffect } from "react";
// REMOVE or comment out the following line:
// import { ContentItem } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Sparkles, 
  Loader2,
  Target,
  PenSquare,
  ClipboardList,
  Users,
  Briefcase,
  Mic,
  BookUser,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import ChatMessage from "../components/chat/ChatMessage";
import ContentTypeSelector from "../components/chat/ContentTypeSelector";
import SaveContentDialog from "../components/chat/SaveContentDialog";

const contentTypes = [
    { id: "tedx_application", label: "TEDx Application Assistant", icon: Target, description: "Craft a winning TEDx application" },
    { id: "talk_designer", label: "Talk Designer", icon: PenSquare, description: "Design a compelling talk from scratch" },
    { id: "message_maker", label: "Message Maker", icon: ClipboardList, description: "Refine your core message and story" },
    { id: "speaker_market_fit", label: "Speaker Market Fit", icon: Mic, description: "Find your unique position in the market" },
    { id: "speaker_bio_creator", label: "Speaker Bio Creator", icon: BookUser, description: "Write a professional speaker bio" },
    { id: "linkedin_profile_assistant", label: "LinkedIn Profile Assistant", icon: Briefcase, description: "Optimize your LinkedIn presence" },
    { id: "audience_whisperer", label: "Audience Whisperer", icon: Users, description: "Deeply understand your target audience" },
    { id: "session_description_creator", label: "Session Description Creator", icon: ClipboardList, description: "Write captivating session descriptions" }
];

const getSystemPrompt = (contentType) => {
    const prompts = {
      tedx_application: "You are an expert TEDx application coach. Help the user craft a compelling application that stands out. Focus on their 'idea worth spreading', personal story, and potential impact.",
      talk_designer: "You are a world-class talk designer and speechwriter. Help the user structure their entire talk, from a powerful opening to a memorable close. Focus on storytelling, key points, and audience engagement.",
      message_maker: "You are a master brand strategist. Help the user distill their core message into a clear, concise, and powerful statement. Explore their unique perspective, key insights, and the 'why' behind their topic.",
      speaker_market_fit: "You are a speaker marketing consultant. Help the user identify their unique market position. Analyze their expertise, target audience, and what makes them different from other speakers in their field.",
      speaker_bio_creator: "You are a professional copywriter specializing in speaker bios. Help the user write a compelling, professional bio that highlights their credibility, expertise, and speaking style.",
      linkedin_profile_assistant: "You are a LinkedIn branding expert. Help the user optimize their LinkedIn profile to attract speaking opportunities. Focus on the headline, summary, and experience sections from a speaker's perspective.",
      audience_whisperer: "You are an expert audience researcher. Help the user deeply understand their target audience. Ask questions to uncover the audience's pain points, desires, and what they need to hear.",
      session_description_creator: "You are a marketing copywriter for events. Help the user write a captivating session description that makes organizers and attendees excited to choose their talk. Focus on benefits, takeaways, and intrigue."
    };
    return prompts[contentType] || "You are a helpful AI assistant for public speakers.";
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState("tedx_application");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [contentToSave, setContentToSave] = useState(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeFromUrl = searchParams.get('type');
    const initialType = contentTypes.some(ct => ct.id === typeFromUrl) ? typeFromUrl : "tedx_application";
    
    setSelectedContentType(initialType);
    
    const currentAssistant = contentTypes.find(ct => ct.id === initialType);
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm your AI content assistant. Let's work on your "${currentAssistant?.label}". What's on your mind?`,
        timestamp: new Date()
      }
    ]);
  }, [location.search]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const systemPrompt = getSystemPrompt(selectedContentType);
      
      const response = await InvokeLLM({
        prompt: `${systemPrompt}\n\nUser request: ${inputValue}`,
        add_context_from_internet: false
      });

      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
        contentType: selectedContentType,
        canSave: true
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleSave = (message, isCompleting = false) => {
    setContentToSave({
      content: message.content,
      contentType: message.contentType,
      originalPrompt: messages[messages.findIndex(m => m === message) - 1]?.content || "",
      isCompleting
    });
    setShowSaveDialog(true);
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy content");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 md:p-6 premium-shadow">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#F6C402]" />
                AI Content Assistant
              </h1>
              <p className="text-navy-600 mt-1">Let's create something amazing together</p>
            </div>
            <ContentTypeSelector 
              contentTypes={contentTypes}
              selectedType={selectedContentType}
              onTypeChange={setSelectedContentType}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage 
                key={index}
                message={message}
                onSave={(msg) => handleSave(msg, false)}
                onComplete={(msg) => handleSave(msg, true)}
                onCopy={handleCopy}
              />
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white glass-effect premium-shadow rounded-2xl p-4 max-w-xs">
                <div className="flex items-center gap-2 text-navy-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Creating content...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Describe what you'd like me to help you create for ${contentTypes.find(ct => ct.id === selectedContentType)?.label.toLowerCase()}...`}
              className="min-h-[60px] max-h-32 pr-12 rounded-xl border-2 border-gray-200 focus:border-[#F6C402] resize-none text-navy-900 placeholder:text-navy-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-[#F6C402] hover:bg-[#e0b002] rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-navy-500 mt-2 text-center">
            Press Cmd/Ctrl + Enter to send • AI responses are generated content
          </p>
        </div>
      </div>

      <SaveContentDialog 
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        contentData={contentToSave}
      />
    </div>
  );
}