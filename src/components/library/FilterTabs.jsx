import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FilterTabs({ tabs, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeFilter === tab.id ? "default" : "outline"}
          onClick={() => onFilterChange(tab.id)}
          className={`rounded-xl h-9 ${
            activeFilter === tab.id
              ? "bg-[#F6C402] hover:bg-[#e0b002] text-white"
              : "border-gray-200 text-navy-700 hover:bg-navy-50"
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <Badge
              variant="secondary"
              className={`ml-2 h-5 ${
                activeFilter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-navy-100 text-navy-600"
              }`}
            >
              {tab.count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}