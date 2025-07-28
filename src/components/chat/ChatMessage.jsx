import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Sparkles, Save, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ChatMessage({ message, onSave, onCopy, onComplete }) {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex gap-3 max-w-4xl ${isUser ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? "bg-navy-100" 
            : "bg-[#F6C402]"
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-navy-600" />
          ) : (
            <Sparkles className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? "text-right" : ""}`}>
          <div className={`inline-block p-4 rounded-2xl max-w-full ${
            isUser 
              ? "bg-navy-100 text-navy-900 rounded-br-md" 
              : message.isError 
                ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-md"
                : "bg-white glass-effect premium-shadow text-navy-900 rounded-bl-md"
          }`}>
            {/* Content Type Badge */}
            {!isUser && message.contentType && (
              <div className="mb-3">
                <Badge variant="secondary" className="bg-[#F6C402]/20 text-[#b49102]">
                  {message.contentType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
            )}

            {/* Message Text */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </div>
            </div>

            {/* Actions */}
            {!isUser && message.canSave && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                <Button
                  size="sm"
                  onClick={() => onComplete(message)}
                  className="rounded-lg text-xs bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Mark as Complete & Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSave(message)}
                  className="rounded-lg text-xs"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Save as Draft
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCopy(message.content)}
                  className="rounded-lg text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <p className={`text-xs text-navy-500 mt-2 ${isUser ? "text-right" : "text-left"}`}>
            {format(message.timestamp, 'h:mm a')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}