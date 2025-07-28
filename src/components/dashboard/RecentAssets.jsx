import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, ExternalLink, Users, Linkedin, FileText, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const contentTypeIcons = {
    tedx_application: Users,
    talk_designer: FileText,
    message_maker: MessageSquare,
    speaker_market_fit: Users,
    speaker_bio_creator: Users,
    linkedin_profile_assistant: Linkedin,
    audience_whisperer: Users,
    session_description_creator: FileText
};

const contentTypeColors = {
  tedx_application: "bg-red-100 text-red-800",
  talk_designer: "bg-blue-100 text-blue-800",
  message_maker: "bg-indigo-100 text-indigo-800",
  speaker_market_fit: "bg-purple-100 text-purple-800",
  speaker_bio_creator: "bg-pink-100 text-pink-800",
  linkedin_profile_assistant: "bg-sky-100 text-sky-800",
  audience_whisperer: "bg-teal-100 text-teal-800",
  session_description_creator: "bg-green-100 text-green-800"
};

export default function RecentAssets({ content, isLoading }) {
  if (isLoading) {
    return (
      <Card className="glass-effect premium-shadow border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-navy-900">
            <Clock className="w-5 h-5" />
            Recent Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-effect premium-shadow border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-navy-900">
            <Clock className="w-5 h-5" />
            Recent Assets
          </CardTitle>
          <Link to={createPageUrl("AssetLibrary")}>
            <Button variant="outline" size="sm" className="rounded-lg">
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {content.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-navy-400" />
              </div>
              <p className="text-navy-600 mb-4">No assets created yet</p>
              <Link to={createPageUrl("Chat")}>
                <Button className="bg-[#F6C402] hover:bg-[#e0b002] text-white rounded-lg">
                  Create Your First Asset
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {content.map((item, index) => {
                const Icon = contentTypeIcons[item.content_type] || FileText;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-navy-900 truncate">{item.title}</h4>
                          <Badge className={`${contentTypeColors[item.content_type]} text-xs flex-shrink-0`}>
                            {item.content_type.replace(/_/g, ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-navy-600 line-clamp-2 mb-2">
                          {item.content.substring(0, 120)}...
                        </p>
                        <p className="text-xs text-navy-500">
                          {format(new Date(item.created_date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}