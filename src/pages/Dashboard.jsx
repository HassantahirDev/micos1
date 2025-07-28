import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  MessageSquare, 
  ArrowRight,
  Library
} from "lucide-react";
import { motion } from "framer-motion";

import Checklist from "../components/dashboard/Checklist";
import RecentAssets from "../components/dashboard/RecentAssets";
import StatsOverview from "../components/dashboard/StatsOverview";

export default function Dashboard() {
  const [recentContent, setRecentContent] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRecentContent([]);
    setAllContent([]);
    setIsLoading(false);
  }, []);

  const stats = {
    totalContent: 0,
    conferencePitches: 0,
    linkedinPosts: 0,
    thisWeek: 0
  };
  const uniqueCompletedTaskTypes = [];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 leading-tight">
              Craft Content That 
              <span className="bg-[#F6C402] bg-clip-text text-transparent"> Converts</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto leading-relaxed">
              Your AI-powered assistant for creating compelling conference pitches and engaging LinkedIn content
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("chat")}>
              <Button className="h-12 px-8 bg-[#F6C402] hover:bg-[#e0b002] text-white font-semibold rounded-xl premium-shadow transition-all duration-300 hover:scale-105">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Creating
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("assetlibrary")}>
              <Button variant="outline" className="h-12 px-8 font-semibold rounded-xl border-2 border-navy-200 text-navy-700 hover:bg-navy-50 transition-all duration-300">
                <Library className="w-5 h-5 mr-2" />
                View Asset Library
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} isLoading={isLoading} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <Checklist completedTaskTypes={uniqueCompletedTaskTypes} />
            <RecentAssets content={recentContent} isLoading={isLoading} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect premium-shadow border-0 bg-gradient-to-br from-navy-50 to-white">
              <CardHeader>
                <CardTitle className="text-navy-900">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-navy-600 leading-relaxed">
                  New to MicDropOS? Pick a task from your checklist to get started.
                </p>
                <Link to={createPageUrl("chat")}>
                  <Button variant="outline" className="w-full rounded-lg border-[#F6C402]/50 text-[#b49102] hover:bg-[#F6C402]/10">
                    Go to AI Assistant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}