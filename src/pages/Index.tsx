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
  Shield,
  TrendingUp,
  MessageCircle,
  Settings
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
              Welcome {currentUser.name}! You're viewing GreenEdventure as a {currentUser.role}.
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
                    GreenEdventure
                  </span>
                  <br />
                  <span className="text-foreground">Education That</span>
                  <br />
                  <span className="text-foreground">Grows with Nature.</span>
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
                  alt="GreenEdventure - Environmental Education Platform" 
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

      {/* Why GreenEdventure Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-primary">GreenEdventure</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Education that grows with nature, empowering students and teachers to make a real difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-interactive group animate-slide-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Gamified Learning</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">→ Higher Engagement</p>
                <p className="text-sm text-muted-foreground">Interactive quizzes and challenges that make learning fun and memorable.</p>
              </CardContent>
            </Card>

            <Card className="card-interactive group animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TreePine className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Real-world Eco Impact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">→ Measurable Change</p>
                <p className="text-sm text-muted-foreground">Track your environmental contributions and see the collective impact of your actions.</p>
              </CardContent>
            </Card>

            <Card className="card-interactive group animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Role-based Dashboards</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">→ Teachers & Admins Empowered</p>
                <p className="text-sm text-muted-foreground">Comprehensive tools for educators to track progress and manage learning experiences.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission of the Week */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="card-eco border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5 hover:scale-105 transition-all duration-300 animate-scale-in">
              <CardContent className="p-8 md:p-12 text-center">
                <Badge className="badge-eco mb-6">
                  <Target className="h-4 w-4" />
                  Mission of the Week
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  This Week's Challenge: Plant a Tree 🌱
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students worldwide in our weekly environmental mission. 
                  Every tree planted brings us closer to a sustainable future!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/eco-missions">
                    <Button className="btn-eco-hero">
                      <Target className="h-5 w-5 mr-2" />
                      Join Mission →
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Users className="h-5 w-5 mr-2" />
                    See Previous Missions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/10 to-accent/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">GreenEdventure</span>?
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/20 to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from students and teachers who are making a difference with GreenEdventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-interactive group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-foreground mb-2">"GreenEdventure made learning fun and meaningful!"</p>
                    <p className="text-muted-foreground text-sm">— Sarah M., Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "I never thought environmental science could be so engaging. The quizzes and missions 
                  make me excited to learn more about protecting our planet."
                </p>
              </CardContent>
            </Card>

            <Card className="card-interactive group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-foreground mb-2">"Finally, a tool to link teaching with real-world action."</p>
                    <p className="text-muted-foreground text-sm">— Dr. Johnson, Teacher</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "The teacher dashboard gives me incredible insights into student progress, and my students 
                  are more engaged than ever with environmental topics."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Extra Features Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/10 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore <span className="text-primary">Extra Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover additional tools and features to enhance your environmental learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link to="/eco-missions">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Eco-Missions</h3>
                  <p className="text-muted-foreground mb-4">Complete real-world environmental challenges and earn rewards for making a difference.</p>
                  <Button className="w-full">Open Missions</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/eco-shop">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Coins className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Eco-Shop</h3>
                  <p className="text-muted-foreground mb-4">Spend your earned eco-coins on avatars, themes, and exclusive rewards.</p>
                  <Button className="w-full">Visit Shop</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/impact-tracker">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Impact Tracker</h3>
                  <p className="text-muted-foreground mb-4">Monitor your environmental impact and see how your actions contribute to global change.</p>
                  <Button className="w-full">View Impact</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/achievements">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Achievements Gallery</h3>
                  <p className="text-muted-foreground mb-4">Browse your collection of earned badges and achievements with detailed descriptions.</p>
                  <Button className="w-full">See Achievements</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/forum">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Community Forum</h3>
                  <p className="text-muted-foreground mb-4">Connect with other eco-warriors, share ideas, and collaborate on environmental projects.</p>
                  <Button className="w-full">Join Forum</Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/integration">
              <Card className="card-interactive group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Integration Docs</h3>
                  <p className="text-muted-foreground mb-4">Developer documentation for integrating GreenEdventure with your learning management system.</p>
                  <Button className="w-full">View Docs</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-success relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-white/10 bg-repeat" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Learn, Play, and Save the Planet?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of students and educators worldwide in the mission to create a sustainable future through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:scale-105 transition-all duration-300">
                <Award className="h-6 w-6 mr-3" />
                Get Started in Demo Mode
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto font-semibold hover:scale-105 transition-all duration-300">
                <BookOpen className="h-6 w-6 mr-3" />
                Explore Features
              </Button>
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
                GreenEdventure
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
              © 2024 GreenEdventure. All rights reserved. Built with 💚 for our planet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;