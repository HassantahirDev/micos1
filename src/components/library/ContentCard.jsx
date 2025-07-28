import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contentTypeColors = {
  conference_pitch: "bg-blue-100 text-blue-800 border-blue-200",
  linkedin_post: "bg-indigo-100 text-indigo-800 border-indigo-200",
  linkedin_article: "bg-purple-100 text-purple-800 border-purple-200",
  talk_outline: "bg-pink-100 text-pink-800 border-pink-200",
  social_caption: "bg-green-100 text-green-800 border-green-200"
};

export default function ContentCard({ item, index, icon: Icon, typeLabel }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.content);
      toast.success("Content copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy content");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <Card className="glass-effect premium-shadow border-0 hover:scale-[1.02] transition-all duration-300 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-navy-600" />
              </div>
              <h3 className="font-semibold text-navy-900 truncate">{item.title}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={`${contentTypeColors[item.content_type]} text-xs border`}>
              {typeLabel}
            </Badge>
            {item.status && (
              <Badge variant="outline" className="text-xs">
                {item.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-navy-600 line-clamp-3 leading-relaxed mb-4">
            {item.content.substring(0, 150)}
            {item.content.length > 150 && "..."}
          </p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs bg-navy-50 text-navy-600">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-navy-50 text-navy-600">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-navy-500">
            <span>{format(new Date(item.created_date), 'MMM d, yyyy')}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="h-7 text-xs rounded-lg"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}