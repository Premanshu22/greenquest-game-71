import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  Award,
  Star,
  Calendar
} from "lucide-react";

const Leaderboard = () => {

  const topStudents = [
    {
      rank: 1,
      name: "Emma Watson",
      school: "Greenwood High",
      points: 4250,
      badges: 15,
      streak: 12,
      avatar: "EW",
      level: 18,
      improvement: "+45",
      isCurrentUser: false
    },
    {
      rank: 2,
      name: "Marcus Chen",
      school: "Eco Academy",
      points: 3980,
      badges: 12,
      streak: 8,
      avatar: "MC",
      level: 16,
      improvement: "+32",
      isCurrentUser: false
    },
    {
      rank: 3,
      name: "Sofia Rodriguez",
      school: "Nature College",
      points: 3750,
      badges: 14,
      streak: 15,
      avatar: "SR",
      level: 15,
      improvement: "+28",
      isCurrentUser: false
    }
  ];

  const allStudents = [
    ...topStudents,
    {
      rank: 4,
      name: "James Wilson",
      school: "Pine Valley School",
      points: 3420,
      badges: 11,
      streak: 5,
      avatar: "JW",
      level: 14,
      improvement: "+15",
      isCurrentUser: false
    },
    {
      rank: 5,
      name: "Aisha Patel",
      school: "Sustainability Institute",
      points: 3200,
      badges: 10,
      streak: 9,
      avatar: "AP",
      level: 13,
      improvement: "+22",
      isCurrentUser: false
    },
    {
      rank: 6,
      name: "Oliver Kim",
      school: "Green Future Academy",
      points: 3050,
      badges: 9,
      streak: 6,
      avatar: "OK",
      level: 12,
      improvement: "+18",
      isCurrentUser: false
    },
    {
      rank: 7,
      name: "Alex Green",
      school: "GreenEdventure Demo",
      points: 2850,
      badges: 8,
      streak: 7,
      avatar: "AG",
      level: 12,
      improvement: "+25",
      isCurrentUser: true
    },
    {
      rank: 8,
      name: "Luna Zhang",
      school: "Earth Sciences School",
      points: 2720,
      badges: 7,
      streak: 4,
      avatar: "LZ",
      level: 11,
      improvement: "+12",
      isCurrentUser: false
    }
  ];

  const stats = [
    { icon: Users, value: "1,247", label: "Total Students", color: "text-primary" },
    { icon: Target, value: "8,450", label: "Quizzes Completed", color: "text-success" },
    { icon: Award, value: "2,103", label: "Badges Earned", color: "text-warning" },
    { icon: Star, value: "94%", label: "Avg Score", color: "text-purple-500" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-700";
      default:
        return "bg-gradient-to-r from-primary to-primary-glow";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-primary">GreenEdventure</span> Leaderboard
          </h1>
          <p className="text-muted-foreground">See how you stack up against other eco-learners!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-eco text-center animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top 3 Podium */}
          <div className="lg:col-span-3">
            <Card className="card-eco animate-scale-in mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                  {/* First Place - Larger Card */}
                  <div 
                    key={topStudents[0].rank} 
                    className={`relative ${getRankColor(topStudents[0].rank)} rounded-2xl p-8 text-white text-center animate-slide-up hover:scale-105 transition-all duration-300 md:w-80 w-full md:h-96 shadow-2xl`}
                    style={{ animationDelay: `0s` }}
                  >
                    {/* Rank Badge - Larger for first place */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <Crown className="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>

                    {/* Avatar - Larger for first place */}
                    <div className="mt-6 mb-6">
                      <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg">
                        <AvatarFallback className="bg-white text-primary font-bold text-xl">
                          {topStudents[0].avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Student Info */}
                    <h3 className="font-bold text-xl mb-2">{topStudents[0].name}</h3>
                    <p className="text-white/80 text-base mb-4">{topStudents[0].school}</p>
                    
                    {/* Champion Badge */}
                    <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-3 py-1">
                      🏆 CHAMPION
                    </Badge>
                    
                    {/* Stats - More detailed for first place */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Points:</span>
                        <span className="font-bold text-lg">{topStudents[0].points.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Level:</span>
                        <span className="font-bold text-lg">{topStudents[0].level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Badges:</span>
                        <span className="font-bold text-lg">{topStudents[0].badges}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Streak:</span>
                        <span className="font-bold text-lg">{topStudents[0].streak} days</span>
                      </div>
                    </div>

                    {/* Improvement Badge */}
                    <Badge className="mt-4 bg-white/20 text-white border-white/30">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {topStudents[0].improvement}
                    </Badge>
                  </div>

                  {/* Second and Third Place - Smaller Cards */}
                  <div className="flex flex-col gap-6 md:w-64">
                    {topStudents.slice(1).map((student, index) => (
                      <div 
                        key={student.rank} 
                        className={`relative ${getRankColor(student.rank)} rounded-2xl p-6 text-white text-center animate-slide-up hover:scale-105 transition-all duration-300 md:h-44`}
                        style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                      >
                        {/* Rank Badge */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            {getRankIcon(student.rank)}
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="mt-4 mb-3">
                          <Avatar className="w-12 h-12 mx-auto border-4 border-white shadow-lg">
                            <AvatarFallback className="bg-white text-primary font-bold text-sm">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Student Info */}
                        <h3 className="font-bold text-base mb-1">{student.name}</h3>
                        <p className="text-white/80 text-xs mb-2">{student.school}</p>
                        
                        {/* Stats - Compact */}
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/80">Points:</span>
                            <span className="font-bold">{student.points.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Level:</span>
                            <span className="font-bold">{student.level}</span>
                          </div>
                        </div>

                        {/* Improvement Badge */}
                        <Badge className="mt-2 bg-white/20 text-white border-white/30 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {student.improvement}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full Leaderboard */}
          <div className="lg:col-span-3">
            <Card className="card-eco animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  All Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allStudents.map((student, index) => (
                    <div 
                      key={student.rank} 
                      className={`leaderboard-row p-4 flex items-center gap-4 ${
                        student.isCurrentUser ? 'bg-primary/10 border-2 border-primary/30' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Rank */}
                      <div className="w-12 h-12 flex items-center justify-center">
                        {student.rank <= 3 ? (
                          getRankIcon(student.rank)
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">#{student.rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`${student.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} font-medium`}>
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          {student.isCurrentUser && (
                            <Badge variant="outline" className="text-primary border-primary">You</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.school}</p>
                      </div>

                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-foreground">{student.points.toLocaleString()}</div>
                          <div className="text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-foreground">{student.level}</div>
                          <div className="text-muted-foreground">Level</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-foreground">{student.badges}</div>
                          <div className="text-muted-foreground">Badges</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-warning" />
                            <span className="font-bold text-foreground">{student.streak}</span>
                          </div>
                          <div className="text-muted-foreground">Streak</div>
                        </div>
                      </div>

                      {/* Mobile Stats */}
                      <div className="md:hidden text-right">
                        <div className="font-bold text-foreground">{student.points.toLocaleString()}</div>
                        <Badge variant="outline" className="text-success border-success/30">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {student.improvement}
                        </Badge>
                      </div>

                      {/* Improvement */}
                      <div className="hidden md:block">
                        <Badge variant="outline" className="text-success border-success/30">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {student.improvement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-6">
                  <Button variant="outline" className="btn-eco-glow">
                    Load More Rankings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="mt-8 text-center">
          <Card className="card-eco inline-block animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Showing:</span>
                <Badge className="badge-eco">This Week</Badge>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  All Time
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  This Month
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;