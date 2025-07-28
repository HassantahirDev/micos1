import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Circle,
  CheckCircle2,
  Sparkles,
  Target,
  PenSquare,
  ClipboardList,
  Users,
  Briefcase,
  Mic,
  BookUser,
} from "lucide-react";
import { motion } from "framer-motion";

const allTasks = [
  { id: "tedx_application", title: "TEDx Application", icon: Target },
  { id: "talk_designer", title: "Talk Designer", icon: PenSquare },
  { id: "message_maker", title: "Message Maker", icon: ClipboardList },
  { id: "speaker_market_fit", title: "Speaker Market Fit", icon: Mic },
  { id: "speaker_bio_creator", title: "Speaker Bio Creator", icon: BookUser },
  { id: "linkedin_profile_assistant", title: "LinkedIn Profile", icon: Briefcase },
  { id: "audience_whisperer", title: "Audience Whisperer", icon: Users },
  { id: "session_description_creator", title: "Session Description", icon: ClipboardList },
];

export default function Checklist({ completedTaskTypes }) {
  const completedSet = new Set(completedTaskTypes);
  
  const todoTasks = allTasks.filter(task => !completedSet.has(task.id));
  const completedTasks = allTasks.filter(task => completedSet.has(task.id));

  const TaskItem = ({ task, isComplete }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <Link to={createPageUrl(`Chat?type=${task.id}`)}>
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${isComplete ? 'border-green-200 bg-green-50/50 text-gray-500' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'}`}>
          {isComplete ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
          )}
          <div className="flex-1">
            <h4 className={`font-semibold ${isComplete ? 'line-through' : 'text-navy-900'}`}>{task.title}</h4>
          </div>
          <task.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>
      </Link>
    </motion.div>
  );

  return (
    <Card className="glass-effect premium-shadow border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-navy-900">
          <Sparkles className="w-5 h-5 text-[#F6C402]" />
          Your Speaker Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-navy-800 mb-3">To Do</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {todoTasks.map(task => <TaskItem key={task.id} task={task} isComplete={false} />)}
            </div>
             {todoTasks.length === 0 && <p className='text-navy-600'>All tasks completed! Amazing work!</p>}
          </div>

          {completedTasks.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-navy-800 mb-3 mt-6">Completed</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {completedTasks.map(task => <TaskItem key={task.id} task={task} isComplete={true} />)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}