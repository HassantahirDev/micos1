import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ContentTypeSelector({ contentTypes, selectedType, onTypeChange }) {
  const selectedContentType = contentTypes.find(ct => ct.id === selectedType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl border-2 border-gray-200 hover:border-[#F6C402]">
          <selectedContentType.icon className="w-4 h-4 mr-2" />
          {selectedContentType.label}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {contentTypes.map((type) => (
          <DropdownMenuItem
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`p-3 cursor-pointer ${selectedType === type.id ? 'bg-[#F6C402]/10' : ''}`}
          >
            <div className="flex items-start gap-3">
              <type.icon className="w-5 h-5 text-navy-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-navy-900">{type.label}</div>
                <div className="text-xs text-navy-600 mt-1">{type.description}</div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}