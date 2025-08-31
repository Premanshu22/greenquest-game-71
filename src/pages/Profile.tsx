import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Trophy, 
  Target, 
  Zap, 
  Award, 
  Leaf, 
  Recycle, 
  TreePine, 
  Sun,
  Droplets,
  Wind,
  Settings,
  TrendingUp,
  Calendar
} from "lucide-react";
import ecoAvatarImage from "@/assets/eco-avatar.jpg";

const Profile = () => {
  const userStats = {
    name: "Alex Green",
    level: 12,
    xp: 2850,
    nextLevelXp: 3000,
    completedModules: 8,
    totalModules: 12,
    streak: 7
  };

  const badges = [
    { icon: Leaf, name: "Eco Warrior", description: "Completed 5 quizzes", earned: true, color: "bg-success" },
    { icon: Recycle, name: "Recycling Champion", description: "Perfect score on recycling quiz", earned: true, color: "bg-primary" },
    { icon: TreePine, name: "Forest Guardian", description: "Mastered forestry module", earned: true, color: "bg-green-600" },
    { icon: Sun, name: "Solar Expert", description: "Aced renewable energy quiz", earned: true, color: "bg-yellow-500" },
    { icon: Droplets, name: "Water Saver", description: "Completed water conservation", earned: false, color: "bg-blue-500" },
    { icon: Wind, name: "Wind Power Pro", description: "Master wind energy concepts", earned: false, color: "bg-cyan-500" }
  ];

  const recentActivity = [
    { action: "Completed Climate Change Quiz", points: "+150 XP", time: "2 hours ago", icon: Target },
    { action: "Earned 'Solar Expert' Badge", points: "+200 XP", time: "1 day ago", icon: Award },
    { action: "Reached Level 12", points: "+300 XP", time: "3 days ago", icon: TrendingUp },
    { action: "7-day learning streak!", points: "+100 XP", time: "Today", icon: Calendar }
  ];

  const progressPercentage = (userStats.xp / userStats.nextLevelXp) * 100;
  const moduleProgress = (userStats.completedModules / userStats.totalModules) * 100;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-primary">EcoQuest</span> Profile
          </h1>
          <p className="text-muted-foreground">Track your progress and achievements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="card-eco animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img 
                    src={ecoAvatarImage} 
                    alt="Profile Avatar" 
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-card">
                    <span className="text-xs font-bold text-white">{userStats.level}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{userStats.name}</h2>
                <Badge className="badge-eco mb-4">
                  <Trophy className="h-4 w-4 mr-1" />
                  Level {userStats.level} Eco Learner
                </Badge>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level {userStats.level + 1}</span>
                      <span>{userStats.xp}/{userStats.nextLevelXp} XP</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 progress-eco" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{userStats.xp}</div>
                      <div className="text-xs text-muted-foreground">Total XP</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{badges.filter(b => b.earned).length}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 btn-eco-glow">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Module Progress */}
            <Card className="card-eco animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Modules Completed</span>
                      <span>{userStats.completedModules}/{userStats.totalModules}</span>
                    </div>
                    <Progress value={moduleProgress} className="h-3 progress-eco" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <Zap className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold">{userStats.completedModules}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="bg-warning/10 rounded-lg p-3">
                      <Target className="h-6 w-6 text-warning mx-auto mb-1" />
                      <div className="text-lg font-bold">{userStats.totalModules - userStats.completedModules}</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Badges and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges Section */}
            <Card className="card-eco animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className={`relative bg-gradient-to-br ${badge.color}/10 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                        badge.earned ? 'animate-bounce-in' : 'opacity-50 grayscale'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg ${
                        badge.earned ? 'animate-glow-pulse' : ''
                      }`}>
                        <badge.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      
                      {badge.earned && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-eco animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/20 to-transparent rounded-lg hover:bg-accent/30 transition-all duration-300 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                      <Badge variant="outline" className="text-success border-success/30">
                        {activity.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;