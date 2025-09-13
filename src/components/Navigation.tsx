import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Trophy, BookOpen, GraduationCap, Leaf, Shield, MoreVertical, ChevronDown, Target, MessageSquare, Award, Eye, EyeOff, Settings, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useDemo } from "@/contexts/DemoContext";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const { toast } = useToast();
  const { 
    isDemoMode, 
    setIsDemoMode, 
    isPresentationMode, 
    setIsPresentationMode, 
    currentUser, 
    currentRole,
    setCurrentRole,
    impersonateUser,
    demoStep,
    setDemoStep,
    totalDemoSteps
  } = useDemo();

  // Role-based navigation items
  const getRoleBasedNavItems = () => {
    const role = isDemoMode ? currentRole : currentUser.role;
    
    const baseItems = [
      { name: "Home", path: "/", icon: Home },
      { name: "Profile", path: "/profile", icon: User },
    ];

    switch (role) {
      case 'admin':
        return [
          ...baseItems,
          { name: "Admin Dashboard", path: "/admin", icon: Shield },
        ];
      case 'teacher':
        return [
          ...baseItems,
          { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
          { name: "Teacher Dashboard", path: "/teacher", icon: BookOpen },
        ];
      case 'student':
        return [
          ...baseItems,
          { name: "Quiz", path: "/quiz", icon: BookOpen },
          { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
          { name: "Student Dashboard", path: "/student-dashboard", icon: GraduationCap },
        ];
      case 'guest':
      default:
        return [
          ...baseItems,
          { name: "Quiz", path: "/quiz", icon: BookOpen },
          { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
        ];
    }
  };

  const filteredNavItems = getRoleBasedNavItems();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return User;
      case 'teacher': return GraduationCap;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600';
      case 'teacher': return 'text-green-600';
      case 'admin': return 'text-purple-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <>
      {/* Demo Step Overlay */}
      {isDemoMode && isPresentationMode && (
        <div className="fixed inset-0 bg-black/50 z-[100] pointer-events-none">
          <div className="absolute top-20 right-4 bg-card p-4 rounded-lg shadow-lg pointer-events-auto max-w-xs animate-bounce-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">Demo Step {demoStep + 1}/{totalDemoSteps}</span>
              <Button size="sm" onClick={() => setIsPresentationMode(false)}>
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {demoStep === 0 && "Welcome! This is the GreenEdventure demo. Click Demo Mode toggle to explore different features."}
              {demoStep === 1 && "Try switching between Student, Teacher, and Admin views using the Impersonate dropdown."}
              {demoStep === 2 && "Navigate to different pages to see role-specific content and features."}
              {demoStep === 3 && "Check out the Extra Features dropdown for Eco-Missions, Shop, Forum, and more!"}
              {demoStep === 4 && "Visit the Eco-Shop to see virtual purchases and coin management in action."}
              {demoStep === 5 && "Explore Eco-Missions to see gamified environmental challenges."}
              {demoStep === 6 && "Join the Community Forum to see collaborative learning features."}
              {demoStep === 7 && "View the Impact Tracker to see global environmental statistics."}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDemoStep(Math.max(0, demoStep - 1))} disabled={demoStep === 0}>
                Previous
              </Button>
              <Button size="sm" onClick={() => setDemoStep(Math.min(totalDemoSteps - 1, demoStep + 1))} disabled={demoStep === totalDemoSteps - 1}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:scale-105 transition-transform">
            <Leaf className="h-8 w-8 text-primary animate-pulse" />
            GreenEdventure
          </NavLink>

          {/* Demo Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Demo Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Demo Mode</span>
              <Switch 
                checked={isDemoMode} 
                onCheckedChange={setIsDemoMode}
              />
            </div>

            {/* Impersonate Dropdown */}
            {isDemoMode && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    {React.createElement(getRoleIcon(currentRole), { 
                      className: `h-4 w-4 ${getRoleColor(currentRole)}` 
                    })}
                    {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Impersonate Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    { role: 'guest', name: 'Guest User', icon: User },
                    { role: 'student', name: 'Student User', icon: User },
                    { role: 'teacher', name: 'Teacher User', icon: GraduationCap },
                    { role: 'admin', name: 'Admin User', icon: Shield }
                  ].map((roleOption) => (
                    <DropdownMenuItem 
                      key={roleOption.role} 
                      onClick={() => {
                        setCurrentRole(roleOption.role as any);
                        toast({
                          title: `Impersonating: ${roleOption.name}`,
                          description: "Navigation updated for role-based access.",
                        });
                      }}
                      className={currentRole === roleOption.role ? "bg-accent" : ""}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {React.createElement(roleOption.icon, { 
                          className: `h-4 w-4 ${getRoleColor(roleOption.role)}` 
                        })}
                        <div className="flex flex-col">
                          <span className="font-medium">{roleOption.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{roleOption.role}</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Impersonate User</DropdownMenuLabel>
                  {mockUsers.map((user) => (
                    <DropdownMenuItem 
                      key={user.id} 
                      onClick={() => impersonateUser(user.id)}
                      className={currentUser.id === user.id ? "bg-accent" : ""}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {React.createElement(getRoleIcon(user.role), { 
                          className: `h-4 w-4 ${getRoleColor(user.role)}` 
                        })}
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Presentation Mode Toggle */}
            {isDemoMode && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsPresentationMode(!isPresentationMode)}
                className="flex items-center gap-2"
              >
                {isPresentationMode ? <EyeOff className="h-4 w-4" /> : <Presentation className="h-4 w-4" />}
                {isPresentationMode ? 'Exit' : 'Present'}
              </Button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
            
            {/* Extra Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-foreground hover:bg-accent hover:text-accent-foreground">
                  Extra Features
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <NavLink to="/eco-missions" className="flex items-center gap-2 w-full">
                    <Target className="h-4 w-4 text-success" />
                    Eco-Missions
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/eco-shop" className="flex items-center gap-2 w-full">
                    <Leaf className="h-4 w-4 text-primary" />
                    Eco-Shop
                  </NavLink>
                </DropdownMenuItem>
                {(currentRole !== 'teacher' || !isDemoMode) && (
                  <DropdownMenuItem asChild>
                    <NavLink to="/forum" className="flex items-center gap-2 w-full">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Community Forum
                    </NavLink>
                  </DropdownMenuItem>
                )}
                {currentRole === 'admin' && isDemoMode && (
                  <DropdownMenuItem asChild>
                    <NavLink to="/forum" className="flex items-center gap-2 w-full">
                      <Settings className="h-4 w-4 text-purple-600" />
                      Forum Settings
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <NavLink to="/impact-tracker" className="flex items-center gap-2 w-full">
                    <Trophy className="h-4 w-4 text-emerald-600" />
                    Impact Tracker
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/achievements" className="flex items-center gap-2 w-full">
                    <Award className="h-4 w-4 text-yellow-600" />
                    Achievements Gallery
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/integration" className="flex items-center gap-2 w-full">
                    <Settings className="h-4 w-4 text-gray-600" />
                    Integration Docs
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {/* Mobile Demo Controls */}
                {isDemoMode && (
                  <>
                    <DropdownMenuLabel>Demo Controls</DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center justify-between">
                      <span>Demo Mode</span>
                      <Switch 
                        checked={isDemoMode} 
                        onCheckedChange={setIsDemoMode}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setIsPresentationMode(!isPresentationMode)}
                      className="flex items-center gap-2"
                    >
                      {isPresentationMode ? <EyeOff className="h-4 w-4" /> : <Presentation className="h-4 w-4" />}
                      {isPresentationMode ? 'Exit Presentation' : 'Presentation Mode'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Switch User</DropdownMenuLabel>
                    {mockUsers.map((user) => (
                      <DropdownMenuItem 
                        key={user.id} 
                        onClick={() => impersonateUser(user.id)}
                        className={currentUser.id === user.id ? "bg-accent" : ""}
                      >
                        <div className="flex items-center gap-2 w-full">
                          {React.createElement(getRoleIcon(user.role), { 
                            className: `h-4 w-4 ${getRoleColor(user.role)}` 
                          })}
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </>
                )}
                {filteredNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <NavLink
                      to={item.path}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink to="/eco-missions" className="flex items-center gap-2 w-full">
                    <Target className="h-4 w-4 text-success" />
                    Eco-Missions
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/eco-shop" className="flex items-center gap-2 w-full">
                    <Leaf className="h-4 w-4 text-primary" />
                    Eco-Shop
                  </NavLink>
                </DropdownMenuItem>
                {(currentRole !== 'teacher' || !isDemoMode) && (
                  <DropdownMenuItem asChild>
                    <NavLink to="/forum" className="flex items-center gap-2 w-full">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Community Forum
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <NavLink to="/impact-tracker" className="flex items-center gap-2 w-full">
                    <Trophy className="h-4 w-4 text-emerald-600" />
                    Impact Tracker
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/achievements" className="flex items-center gap-2 w-full">
                    <Award className="h-4 w-4 text-yellow-600" />
                    Achievements Gallery
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/integration" className="flex items-center gap-2 w-full">
                    <Settings className="h-4 w-4 text-gray-600" />
                    Integration Docs
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};