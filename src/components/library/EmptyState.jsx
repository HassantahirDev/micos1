import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Plus, Search } from "lucide-react";

export default function EmptyState({ hasContent, searchQuery, activeFilter, onClearFilters }) {
  if (!hasContent) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-navy-400" />
        </div>
        <h3 className="text-xl font-semibold text-navy-900 mb-3">No content yet</h3>
        <p className="text-navy-600 mb-6 max-w-md mx-auto leading-relaxed">
          Start creating amazing content with our AI assistant. Generate conference pitches, LinkedIn posts, and more.
        </p>
        <Link to={createPageUrl("Chat")}>
          <Button className="bg-[#F6C402] hover:bg-[#e0b002] text-white rounded-xl premium-shadow">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Content
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-navy-400" />
      </div>
      <h3 className="text-xl font-semibold text-navy-900 mb-3">No matching content</h3>
      <p className="text-navy-600 mb-6 max-w-md mx-auto leading-relaxed">
        {searchQuery 
          ? `No content found for "${searchQuery}". Try adjusting your search terms.`
          : `No content found for the selected filter. Try viewing all content or selecting a different category.`
        }
      </p>
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="rounded-xl border-gray-200 text-navy-700 hover:bg-navy-50"
      >
        Clear Filters
      </Button>
    </div>
  );
}