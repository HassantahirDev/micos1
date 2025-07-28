import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Linkedin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const statCards = [
  {
    title: "Total Content",
    key: "totalContent",
    icon: FileText,
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Conference Pitches",
    key: "conferencePitches", 
    icon: Users,
    color: "from-indigo-400 to-indigo-600"
  },
  {
    title: "LinkedIn Content",
    key: "linkedinPosts",
    icon: Linkedin,
    color: "from-purple-400 to-purple-600"
  },
  {
    title: "This Week",
    key: "thisWeek",
    icon: Calendar,
    color: "from-amber-400 to-amber-600"
  }
];

export default function StatsOverview({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index }}
        >
          <Card className="glass-effect premium-shadow border-0 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.key === 'thisWeek' ? 'bg-[#F6C402]' : `bg-gradient-to-r ${stat.color}`} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-navy-600 font-medium">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-navy-900">
                    {isLoading ? "..." : stats[stat.key]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}