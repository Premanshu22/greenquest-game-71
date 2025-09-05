import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Trophy, 
  Award, 
  Target, 
  Calendar,
  Flame,
  Star,
  Coins,
  TrendingUp,
  BookOpen,
  Crown,
  Settings
} from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { mockBadges, mockQuizzes } from "@/data/mockData";

const Profile = () => {
  const { currentUser, isDemoMode } = useDemo();
  
  const userBadges = isDemoMode 
    ? mockBadges.filter(badge => currentUser.badges.includes(badge.id))
    : [];

  const completedQuizzes = isDemoMode 
    ? mockQuizzes.filter(quiz => quiz.completed)
    : [];

  const averageScore = completedQuizzes.length > 0
    ? Math.round(completedQuizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0) / completedQuizzes.length)
    : 0;

  const progressToNextLevel = isDemoMode
    ? (currentUser.xp / (currentUser.xp + currentUser.xpToNextLevel)) * 100
    : 75;

  return (
    <div className="min-h-screen bg-gradient-eco py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">EcoQuest</span> Profile
          </h1>
          <p className="text-xl text-muted-foreground">Track your environmental learning journey</p>
        </div>

        {/* Main Profile Card */}
        <Card className="card-eco animate-scale-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground">{currentUser.name}</h1>
                <p className="text-muted-foreground mb-4">Environmental Champion</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-1 text-primary">
                    <Crown className="h-4 w-4" />
                    <span className="font-semibold">Level {currentUser.level}</span>
                  </div>
                  {isDemoMode && (
                    <div className="flex items-center gap-1 text-warning">
                      <Flame className="h-4 w-4" />
                      <span className="font-semibold">{currentUser.streak} day streak</span>
                    </div>
                  )}
                </div>
              </div>
              {isDemoMode && (
                <div className="text-center">
                  <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                    <Coins className="h-5 w-5" />
                    {currentUser.coins} Eco-Coins
                  </div>
                  <Button className="mt-2" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>

            {isDemoMode && (
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to Level {currentUser.level + 1}</span>
                    <span className="font-medium">{currentUser.xp} / {currentUser.xp + currentUser.xpToNextLevel} XP</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{currentUser.coins}</div>
                    <div className="text-xs text-muted-foreground">Eco-Coins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{userBadges.length}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{completedQuizzes.length}</div>
                    <div className="text-xs text-muted-foreground">Quizzes</div>
                  </div>
                  {averageScore > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Earned Badges */}
          <Card className="card-eco animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Earned Badges ({userBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userBadges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {userBadges.slice(0, 6).map((badge, index) => (
                    <div key={badge.id} className="text-center p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className="font-semibold text-sm text-foreground">{badge.name}</h4>
                      <Badge className="mt-2 text-xs" variant="outline">
                        {badge.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No badges earned yet. Complete challenges to start collecting!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-eco animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 animate-fade-in">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Completed {completedQuizzes[completedQuizzes.length - 1]?.title || 'Climate Quiz'}</p>
                    <p className="text-sm text-muted-foreground">2 hours ago • +{completedQuizzes[completedQuizzes.length - 1]?.xpReward || 50} XP</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Earned "{userBadges[userBadges.length - 1]?.name || 'Eco Warrior'}" badge</p>
                    <p className="text-sm text-muted-foreground">1 day ago • +100 XP</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Joined Eco-Mission Challenge</p>
                    <p className="text-sm text-muted-foreground">2 days ago • +75 XP</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;