import { NavLink } from "react-router-dom";
import { Home, User, Trophy, BookOpen, GraduationCap, Leaf, LogOut, Shield, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const { userProfile, signOut } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { name: "Profile", path: "/profile", icon: User },
      { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
      { name: "Quiz", path: "/quiz", icon: BookOpen },
    ];

    if (userProfile?.role === 'teacher') {
      baseItems.push({ name: "Teacher", path: "/teacher", icon: GraduationCap });
    }
    
    if (userProfile?.role === 'admin') {
      baseItems.push(
        { name: "Teacher", path: "/teacher", icon: GraduationCap },
        { name: "Admin", path: "/admin", icon: Shield }
      );
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:scale-105 transition-transform">
            <Leaf className="h-8 w-8 text-primary animate-pulse" />
            EcoQuest
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
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
          </div>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {userProfile?.name} ({userProfile?.role})
              </span>
              <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    {userProfile?.name} ({userProfile?.role})
                  </div>
                  <DropdownMenuSeparator />
                  {navItems.map((item) => (
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
                  <DropdownMenuItem onClick={signOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};