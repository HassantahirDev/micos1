import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function SaveContentDialog({ open, onOpenChange, contentData }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (contentData && open) {
      // Auto-generate title from content
      const firstLine = contentData.content.split('\n')[0];
      const autoTitle = firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine;
      setTitle(autoTitle.replace(/[#*]/g, '').trim());
      setTags("");
    }
  }, [contentData, open]);

  const handleSave = async () => {
    if (!title.trim() || !contentData) return;

    setIsSaving(true);
    try {
      // Simulate save (no-op)
      await new Promise(resolve => setTimeout(resolve, 500));
      const successMessage = contentData.isCompleting ? "Asset saved and marked as complete!" : "Draft saved successfully!";
      toast.success(successMessage);
      
      onOpenChange(false);
      setTitle("");
      setTags("");

      if(contentData.isCompleting) {
        navigate(createPageUrl("Dashboard"));
      }

    } catch (error) {
      toast.error("Failed to save content");
      console.error("Error saving content:", error);
    }
    setIsSaving(false);
  };

  const contentTypeLabels = {
    tedx_application: "TEDx Application",
    talk_designer: "Talk Design",
    message_maker: "Message",
    speaker_market_fit: "Market Fit",
    speaker_bio_creator: "Speaker Bio",
    linkedin_profile_assistant: "LinkedIn Profile",
    audience_whisperer: "Audience Research",
    session_description_creator: "Session Description"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {contentData?.isCompleting ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Save className="w-5 h-5 text-[#F6C402]" />}
            {contentData?.isCompleting ? "Complete and Save Asset" : "Save as Draft"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {contentData && (
            <div className="mb-4">
              <Badge className="bg-[#F6C402]/20 text-[#b49102]">
                {contentTypeLabels[contentData.contentType]}
              </Badge>
            </div>
          )}

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your content"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              e.g., tech conference, AI, machine learning
            </p>
          </div>

          {contentData && (
            <div>
              <Label>Content Preview</Label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {contentData.content.substring(0, 200)}
                  {contentData.content.length > 200 && "..."}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim() || isSaving}
              className={contentData?.isCompleting ? "bg-green-600 hover:bg-green-700" : "bg-[#F6C402] hover:bg-[#e0b002]"}
            >
              {contentData?.isCompleting ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <Save className="w-4 h-4 mr-1" />}
              {isSaving ? "Saving..." : (contentData?.isCompleting ? "Complete & Save" : "Save Draft")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}