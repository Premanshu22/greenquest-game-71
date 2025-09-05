import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Trophy, 
  Award, 
  GraduationCap, 
  Leaf, 
  Recycle, 
  TreePine, 
  Sun,
  Users,
  Target,
  Star,
  Zap,
  Coins,
  Crown,
  Shield
} from "lucide-react";
import ecoHeroImage from "@/assets/eco-hero.jpg";
import { useDemo } from "@/contexts/DemoContext";
import { mockQuizzes } from "@/data/mockData";

const Index = () => {
  const { currentUser, isDemoMode } = useDemo();

  const features = [
    {
      icon: BookOpen,
      title: "Gamified Quizzes",
      description: "Learn environmental concepts through fun, interactive quizzes with instant feedback and rewards.",
      color: "bg-gradient-to-br from-primary to-primary-glow"
    },
    {
      icon: Trophy,
      title: "Leaderboards", 
      description: "Compete with classmates and climb the rankings as you master eco-knowledge.",
      color: "bg-gradient-to-br from-warning to-yellow-500"
    },
    {
      icon: Award,
      title: "Achievement Badges",
      description: "Unlock beautiful eco-themed badges as you complete challenges and reach milestones.",
      color: "bg-gradient-to-br from-success to-green-500"
    },
    {
      icon: GraduationCap,
      title: "Teacher Tools",
      description: "Powerful dashboard for educators to track progress and create custom learning content.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    }
  ];

  const stats = isDemoMode ? [
    { icon: Users, value: "1,247", label: "Active Students" },
    { icon: Target, value: `${mockQuizzes.filter(q => q.completed).length}/${mockQuizzes.length}`, label: "Quizzes Completed" },
    { icon: Star, value: "98%", label: "Engagement Rate" },
    { icon: Zap, value: `${currentUser.badges.length}+`, label: "Badges Earned" }
  ] : [
    { icon: Users, value: "1,000+", label: "Active Students" },
    { icon: Target, value: "500+", label: "Quizzes Completed" },
    { icon: Star, value: "95%", label: "Engagement Rate" },
    { icon: Zap, value: "250+", label: "Badges Earned" }
  ];

  const getUserIcon = (role: string) => {
    switch (role) {
      case 'student': return Users;
      case 'teacher': return GraduationCap;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Demo Welcome Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-primary to-primary-glow text-white p-4 text-center">
          <div className="container mx-auto flex items-center justify-center gap-4">
            {React.createElement(getUserIcon(currentUser.role), { className: "h-6 w-6" })}
            <span className="font-semibold">
              Welcome {currentUser.name}! You're viewing EcoQuest as a {currentUser.role}.
            </span>
            {currentUser.role !== 'student' && (
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Level {currentUser.level} • {currentUser.coins} <Coins className="h-4 w-4 ml-1" />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="badge-eco w-fit">
                  <Leaf className="h-4 w-4" />
                  Environmental Education Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent">
                    EcoQuest
                  </span>
                  <br />
                  <span className="text-foreground">Learn. Play.</span>
                  <br />
                  <span className="text-foreground">Save the Planet.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Transform environmental education through gamification. Engage students with interactive quizzes, 
                  achievements, and collaborative learning experiences.
                </p>
              </div>

              {/* User Progress Bar (Demo Mode) */}
              {isDemoMode && (
                <Card className="card-eco p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                        <Crown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Level {currentUser.level}</h3>
                        <p className="text-sm text-muted-foreground">{currentUser.xp} / {currentUser.xp + currentUser.xpToNextLevel} XP</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Coins className="h-5 w-5" />
                        {currentUser.coins} Eco-Coins
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {currentUser.streak} day streak 🔥
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={(currentUser.xp / (currentUser.xp + currentUser.xpToNextLevel)) * 100} 
                    className="h-2" 
                  />
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quiz">
                  <Button className="btn-eco-hero group">
                    <BookOpen className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Start Exploring
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105">
                    <Trophy className="h-5 w-5 mr-2" />
                    See Leaderboard
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={ecoHeroImage} 
                  alt="EcoQuest - Environmental Education Platform" 
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-br from-warning to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-glow-pulse">
                <Sun className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-accent/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">EcoQuest</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our gamified approach makes environmental education engaging, effective, and fun for students of all ages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-interactive group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-success/10 rounded-3xl p-12 border border-primary/20 animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Start Your <span className="text-primary">Eco Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of students already learning and making a difference. 
              Start your environmental education adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile">
                <Button className="btn-eco-hero">
                  <Award className="h-5 w-5 mr-2" />
                  View My Profile
                </Button>
              </Link>
              <Link to="/teacher">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Teacher Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl text-primary">
                <Leaf className="h-6 w-6" />
                EcoQuest
              </div>
              <p className="text-muted-foreground">
                Empowering the next generation through gamified environmental education.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <div className="space-y-2">
                <Link to="/quiz" className="block text-muted-foreground hover:text-primary transition-colors">Quizzes</Link>
                <Link to="/leaderboard" className="block text-muted-foreground hover:text-primary transition-colors">Leaderboard</Link>
                <Link to="/profile" className="block text-muted-foreground hover:text-primary transition-colors">Profile</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">For Educators</h4>
              <div className="space-y-2">
                <Link to="/teacher" className="block text-muted-foreground hover:text-primary transition-colors">Teacher Dashboard</Link>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Resources</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Support</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">About</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 EcoQuest. All rights reserved. Built with 💚 for our planet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;