import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Crown, 
  Coins, 
  Flame, 
  Trophy, 
  BookOpen, 
  Target, 
  ChevronRight,
  Sparkles,
  Award,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { mockBadges, mockMissions, mockQuizzes } from "@/data/mockData";

const StudentDashboard = () => {
  const { currentUser } = useDemo();

  // Get recent badges (last 4)
  const recentBadges = currentUser.badges.slice(-4).map(badgeId => 
    mockBadges.find(badge => badge.id === badgeId)
  ).filter(Boolean);

  // Get next available quiz
  const nextQuiz = mockQuizzes.find(quiz => !quiz.completed);

  // Get current mission
  const currentMission = mockMissions.find(mission => mission.status === 'current');

  // Animation trigger for XP/coins
  const [animateCoins, setAnimateCoins] = React.useState(false);
  const [animateXP, setAnimateXP] = React.useState(false);

  const triggerCoinAnimation = () => {
    setAnimateCoins(true);
    setTimeout(() => setAnimateCoins(false), 1000);
  };

  const triggerXPAnimation = () => {
    setAnimateXP(true);
    setTimeout(() => setAnimateXP(false), 1000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with Avatar, Name, Level, XP Progress */}
      <Card className="card-eco overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {currentUser.avatar}
              </div>
              
              {/* Name and Level */}
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {currentUser.displayName || currentUser.name}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge className="badge-eco">
                    <Crown className="h-4 w-4 mr-1" />
                    Level {currentUser.level}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {currentUser.role}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Coins Display */}
            <div className={`text-right transition-all duration-300 ${animateCoins ? 'scale-110 animate-pulse' : ''}`}>
              <div className="flex items-center gap-2 text-xl font-bold text-primary">
                <Coins className="h-6 w-6" />
                {currentUser.coins}
                {animateCoins && <Sparkles className="h-5 w-5 text-yellow-500" />}
              </div>
              <p className="text-sm text-muted-foreground">Eco-Coins</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Experience Progress</span>
              <span className={`text-sm text-muted-foreground transition-all duration-300 ${animateXP ? 'text-primary font-bold' : ''}`}>
                {currentUser.xp} / {currentUser.xp + currentUser.xpToNextLevel} XP
                {animateXP && <Sparkles className="inline h-4 w-4 ml-1 text-yellow-500" />}
              </span>
            </div>
            <Progress 
              value={(currentUser.xp / (currentUser.xp + currentUser.xpToNextLevel)) * 100} 
              className="h-3 bg-gradient-to-r from-primary/20 to-success/20"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Streak Card */}
          <Card className="card-interactive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{currentUser.streak} Day Streak</h3>
                    <p className="text-muted-foreground">Keep it up! You're on fire! 🔥</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-500">{currentUser.streak}</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Badges - Horizontally Scrollable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {recentBadges.map((badge) => (
                    <Dialog key={badge?.id}>
                      <DialogTrigger asChild>
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-success/10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-primary/20 hover:border-primary/40">
                          <span className="text-2xl">{badge?.icon}</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{badge?.icon}</span>
                            {badge?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              badge?.rarity === 'legendary' ? 'border-yellow-500 text-yellow-600' :
                              badge?.rarity === 'epic' ? 'border-purple-500 text-purple-600' :
                              badge?.rarity === 'rare' ? 'border-blue-500 text-blue-600' :
                              'border-gray-500 text-gray-600'
                            }>
                              {badge?.rarity}
                            </Badge>
                            <Badge variant="secondary">{badge?.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{badge?.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-primary" />
                            <span>{badge?.unlockCondition}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-success">
                            <Sparkles className="h-4 w-4" />
                            <span>+{badge?.xpReward} XP Reward</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                  
                  {recentBadges.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Complete missions to earn badges!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Test Animation Buttons (Demo) */}
          <Card className="border-dashed border-primary/30">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={triggerCoinAnimation}
                  className="text-xs"
                >
                  Test Coin Animation
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={triggerXPAnimation}
                  className="text-xs"
                >
                  Test XP Animation
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Demo: Click to see micro-animations when actions happen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick CTA - Start Next Quiz */}
          {nextQuiz && (
            <Card className="card-interactive bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-5 w-5" />
                  Ready for Next Quiz?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{nextQuiz.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Badge variant="outline" className="text-xs">{nextQuiz.difficulty}</Badge>
                      <span>•</span>
                      <span>{nextQuiz.questions} questions</span>
                      <span>•</span>
                      <span>+{nextQuiz.xpReward} XP</span>
                    </div>
                  </div>
                  <Link to="/quiz">
                    <Button className="w-full btn-eco-hero">
                      Start Quiz
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Mission Preview */}
          {currentMission && (
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{currentMission.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentMission.description.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {currentMission.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>+{currentMission.rewardXP} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-primary" />
                      <span>+{currentMission.rewardCoins}</span>
                    </div>
                  </div>
                  <Link to="/eco-missions">
                    <Button variant="outline" className="w-full">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Badges Earned</span>
                  <span className="font-semibold">{currentUser.badges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quizzes Completed</span>
                  <span className="font-semibold">{mockQuizzes.filter(q => q.completed).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <span className="font-semibold text-orange-500">{currentUser.streak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total XP</span>
                  <span className="font-semibold text-primary">{currentUser.xp}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;