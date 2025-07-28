import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Users, Linkedin, FileText, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const quickActions = [
  {
    title: "Conference Pitch",
    description: "Create compelling talk proposals",
    icon: Users,
    color: "from-blue-400 to-blue-600",
    href: createPageUrl("Chat") + "?type=conference_pitch"
  },
  {
    title: "LinkedIn Post",
    description: "Craft engaging social content",
    icon: Linkedin,
    color: "from-indigo-400 to-indigo-600",
    href: createPageUrl("Chat") + "?type=linkedin_post"
  },
  {
    title: "LinkedIn Article",
    description: "Write thought leadership pieces",
    icon: FileText,
    color: "from-purple-400 to-purple-600",
    href: createPageUrl("Chat") + "?type=linkedin_article"
  },
  {
    title: "Talk Outline",
    description: "Structure your presentation",
    icon: MessageSquare,
    color: "from-pink-400 to-pink-600",
    href: createPageUrl("Chat") + "?type=talk_outline"
  }
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="glass-effect premium-shadow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-navy-900">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link to={action.href}>
                  <Button
                    variant="outline"
                    className="h-auto p-4 w-full text-left border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:scale-105 rounded-xl"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900">{action.title}</div>
                        <div className="text-xs text-navy-600 mt-1">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}