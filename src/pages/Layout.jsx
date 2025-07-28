import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Sparkles, 
  User, 
  LogOut,
  Target,
  PenSquare,
  ClipboardList,
  Users,
  Briefcase,
  Mic,
  BookUser,
  Library
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/api/supabaseClient";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
  { title: "TEDx Application Assistant", url: createPageUrl("Chat?type=tedx_application"), icon: Target },
  { title: "Talk Designer", url: createPageUrl("Chat?type=talk_designer"), icon: PenSquare },
  { title: "Message Maker", url: createPageUrl("Chat?type=message_maker"), icon: ClipboardList },
  { title: "Speaker Market Fit", url: createPageUrl("Chat?type=speaker_market_fit"), icon: Mic },
  { title: "Speaker Bio Creator", url: createPageUrl("Chat?type=speaker_bio_creator"), icon: BookUser },
  { title: "LinkedIn Profile Assistant", url: createPageUrl("Chat?type=linkedin_profile_assistant"), icon: Briefcase },
  { title: "Audience Whisperer", url: createPageUrl("Chat?type=audience_whisperer"), icon: Users },
  { title: "Session Description Creator", url: createPageUrl("Chat?type=session_description_creator"), icon: ClipboardList },
  { title: "Asset Library", url: createPageUrl("AssetLibrary"), icon: Library },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("jwt_token");
    navigate(createPageUrl("Login"));
  };

  return (
    <SidebarProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap');
        
        :root {
          --navy-50: #f8fafc;
          --navy-100: #f1f5f9;
          --navy-200: #e2e8f0;
          --navy-500: #64748b;
          --navy-700: #334155;
          --navy-900: #0f172a;
        }
        
        body {
          font-family: 'Raleway', system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, var(--navy-50) 0%, #ffffff 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .premium-shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8);
        }
      `}</style>
      
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r-0 premium-shadow glass-effect">
          <SidebarHeader className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F6C402] rounded-xl flex items-center justify-center premium-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-navy-900 text-lg">MicDropOS</h2>
                <p className="text-xs text-navy-500 font-medium">AI Content Assistant</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isActive = location.pathname + location.search === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`h-12 rounded-xl font-medium transition-all duration-300 mb-2 justify-start ${
                            isActive 
                              ? 'bg-[#F6C402] hover:bg-[#e0b002] text-white shadow-lg' 
                              : 'hover:bg-navy-50 text-navy-700 hover:text-navy-900'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4">
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-semibold text-sm truncate">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 p-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-navy-50 p-2 -m-2 rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-navy-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-900 text-sm truncate">
                      {typeof window !== "undefined" && localStorage.getItem("user_name")
                        ? localStorage.getItem("user_name")
                        : "Content Creator"}
                    </p>
                    <p className="text-xs text-navy-500 truncate">Craft amazing content</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-gradient-to-br from-navy-50 via-white to-navy-50">
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 md:hidden premium-shadow">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-navy-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-navy-900">MicDropOS</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

