
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar,
  ExternalLink,
  FileText,
  Users,
  Linkedin,
  MessageSquare,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

import ContentCard from "../components/library/ContentCard";
import FilterTabs from "../components/library/FilterTabs";
import EmptyState from "../components/library/EmptyState";

export default function Library() {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const contentTypeIcons = {
    conference_pitch: Users,
    linkedin_post: Linkedin,
    linkedin_article: FileText,
    talk_outline: MessageSquare,
    social_caption: MessageSquare
  };

  const contentTypeLabels = {
    conference_pitch: "Conference Pitch",
    linkedin_post: "LinkedIn Post", 
    linkedin_article: "LinkedIn Article",
    talk_outline: "Talk Outline",
    social_caption: "Social Caption"
  };

  const filterTabs = [
    { id: "all", label: "All Content", count: 0 },
    { id: "conference_pitch", label: "Conference Pitches", count: 0 },
    { id: "linkedin_post", label: "LinkedIn Posts", count: 0 },
    { id: "linkedin_article", label: "Articles", count: 0 },
    { id: "talk_outline", label: "Talk Outlines", count: 0 }
  ];

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    filterAndSortContent();
  }, [content, searchQuery, activeFilter, sortBy]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const data = await ContentItem.list("-created_date");
      setContent(data);
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setIsLoading(false);
  };

  const filterAndSortContent = () => {
    let filtered = [...content];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Apply content type filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(item => item.content_type === activeFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_date) - new Date(a.created_date);
        case "oldest":
          return new Date(a.created_date) - new Date(b.created_date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredContent(filtered);
  };

  const getFilterCounts = () => {
    return filterTabs.map(tab => ({
      ...tab,
      count: tab.id === "all" ? content.length : content.filter(item => item.content_type === tab.id).length
    }));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-2">Content Library</h1>
            <p className="text-navy-600">Organize and manage all your AI-generated content</p>
          </div>
          <Link to={createPageUrl("Chat")}>
            <Button className="bg-[#F6C402] hover:bg-[#e0b002] text-white rounded-xl premium-shadow">
              <Plus className="w-4 h-4 mr-2" />
              Create New Content
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="glass-effect premium-shadow rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-navy-400" />
              <Input
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-200 focus:border-[#F6C402]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-navy-700 focus:border-[#F6C402] focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
              </select>
            </div>
          </div>

          <FilterTabs 
            tabs={getFilterCounts()}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="glass-effect premium-shadow rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredContent.length === 0 ? (
          <EmptyState 
            hasContent={content.length > 0}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onClearFilters={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
          />
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {filteredContent.map((item, index) => (
                <ContentCard 
                  key={item.id}
                  item={item}
                  index={index}
                  icon={contentTypeIcons[item.content_type]}
                  typeLabel={contentTypeLabels[item.content_type]}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
