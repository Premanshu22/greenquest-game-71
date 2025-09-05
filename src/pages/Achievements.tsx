import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Crown, Lock } from "lucide-react";
import { mockBadges } from "@/data/mockData";
import { useDemo } from "@/contexts/DemoContext";

const Achievements = () => {
  const { currentUser } = useDemo();
  
  const unlockedBadges = mockBadges.filter(badge => 
    currentUser.badges.includes(badge.id)
  );
  
  const lockedBadges = mockBadges.filter(badge => 
    !currentUser.badges.includes(badge.id)
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement': return Trophy;
      case 'mastery': return Crown;
      case 'participation': return Star;
      case 'special': return Award;
      default: return Trophy;
    }
  };

  const completionPercentage = Math.round((unlockedBadges.length / mockBadges.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-eco p-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Achievement Gallery
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your environmental journey through badges and achievements. Each badge represents a milestone in your eco-education adventure.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="card-eco">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {unlockedBadges.length} of {mockBadges.length} badges earned
              </span>
              <span className="text-2xl font-bold text-primary">
                {completionPercentage}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {unlockedBadges.filter(b => b.rarity === 'common').length}
                </div>
                <div className="text-sm text-muted-foreground">Common</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {unlockedBadges.filter(b => b.rarity === 'rare').length}
                </div>
                <div className="text-sm text-muted-foreground">Rare</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {unlockedBadges.filter(b => b.rarity === 'epic').length}
                </div>
                <div className="text-sm text-muted-foreground">Epic</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {unlockedBadges.filter(b => b.rarity === 'legendary').length}
                </div>
                <div className="text-sm text-muted-foreground">Legendary</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unlocked Achievements */}
        {unlockedBadges.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Earned Badges
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {unlockedBadges.map((badge, index) => {
                const CategoryIcon = getCategoryIcon(badge.category);
                return (
                  <Card 
                    key={badge.id} 
                    className="card-interactive group animate-bounce-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="relative">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {badge.icon}
                        </div>
                        <div className={`absolute -top-2 -right-2 w-6 h-6 ${getRarityColor(badge.rarity)} rounded-full flex items-center justify-center`}>
                          <CategoryIcon className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-foreground">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getRarityColor(badge.rarity)} text-white`}>
                          {badge.rarity}
                        </Badge>
                        <div className="flex items-center gap-1 text-primary">
                          <Star className="h-4 w-4" />
                          <span className="text-sm font-medium">{badge.xpReward} XP</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedBadges.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Lock className="h-6 w-6 text-muted-foreground" />
              Locked Badges
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lockedBadges.map((badge, index) => {
                const CategoryIcon = getCategoryIcon(badge.category);
                return (
                  <Card 
                    key={badge.id} 
                    className="card-eco opacity-60 hover:opacity-80 transition-opacity"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="relative">
                        <div className="text-6xl mb-4 filter grayscale">
                          {badge.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-muted-foreground">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <p className="text-xs text-primary font-medium">{badge.unlockCondition}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                          {badge.rarity}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span className="text-sm font-medium">{badge.xpReward} XP</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;