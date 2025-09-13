import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trees, Droplets, Wind, Trophy, School, Users, Globe, TrendingUp } from "lucide-react";

const ImpactTracker = () => {
  const [animatedStats, setAnimatedStats] = useState({
    trees: 0,
    water: 0,
    co2: 0
  });

  const targetStats = {
    trees: 47563,
    water: 892456,
    co2: 156789
  };

  // Animate counters on component mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setAnimatedStats({
        trees: Math.floor(targetStats.trees * easeOutExpo),
        water: Math.floor(targetStats.water * easeOutExpo),
        co2: Math.floor(targetStats.co2 * easeOutExpo)
      });

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const topSchools = [
    { name: "Green Valley High School", points: 12450, students: 850, city: "Portland" },
    { name: "EcoTech Academy", points: 11280, students: 620, city: "San Francisco" },
    { name: "Nature's Way Elementary", points: 9870, students: 450, city: "Seattle" },
    { name: "Sustainable Studies Institute", points: 8650, students: 720, city: "Denver" },
    { name: "Earth Champions Middle School", points: 7420, students: 380, city: "Austin" }
  ];

  const globalRegions = [
    { region: "North America", progress: 78, color: "bg-emerald-500" },
    { region: "Europe", progress: 65, color: "bg-green-500" },
    { region: "Asia Pacific", progress: 52, color: "bg-lime-500" },
    { region: "South America", progress: 41, color: "bg-teal-500" },
    { region: "Africa", progress: 33, color: "bg-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-12 w-12 text-emerald-600 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Global Impact Tracker
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            See the real-time environmental impact of our global GreenEdventure community
          </p>
          <Badge variant="secondary" className="mt-2 bg-emerald-100 text-emerald-700">
            <TrendingUp className="h-4 w-4 mr-1" />
            Growing every day
          </Badge>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <Trees className="h-6 w-6" />
                Trees Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {animatedStats.trees.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Equivalent to 3 football fields of forest</p>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <div className="text-xs text-emerald-600 font-medium">This month: +2,847</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Droplets className="h-6 w-6" />
                Water Conserved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {animatedStats.water.toLocaleString()} L
              </div>
              <p className="text-sm text-muted-foreground">Enough to fill 357 swimming pools</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-600 font-medium">This month: +15,236 L</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <Wind className="h-6 w-6" />
                CO₂ Reduced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {animatedStats.co2.toLocaleString()} kg
              </div>
              <p className="text-sm text-muted-foreground">Equal to 680 cars off the road for a year</p>
              <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                <div className="text-xs text-teal-600 font-medium">This month: +8,432 kg</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Progress Map */}
        <Card className="mb-12 border-green-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Globe className="h-6 w-6" />
              Global Green Progress
            </CardTitle>
            <p className="text-muted-foreground">Environmental awareness spreading worldwide</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {globalRegions.map((region) => (
                <div key={region.region} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{region.region}</span>
                    <Badge variant="outline" className="text-xs">
                      {region.progress}%
                    </Badge>
                  </div>
                  <Progress value={region.progress} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    {region.progress > 60 ? "Leading the way!" : 
                     region.progress > 40 ? "Growing strong" : "Building momentum"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Schools Leaderboard */}
        <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Trophy className="h-6 w-6" />
              Top Eco-Schools Leaderboard
            </CardTitle>
            <p className="text-muted-foreground">Schools making the biggest environmental impact</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSchools.map((school, index) => (
                <div
                  key={school.name}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    index === 0
                      ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                      : index === 2
                      ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      index === 0 ? "bg-amber-500 text-white" :
                      index === 1 ? "bg-gray-400 text-white" :
                      index === 2 ? "bg-orange-500 text-white" :
                      "bg-gray-300 text-gray-700"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{school.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <School className="h-4 w-4" />
                          {school.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {school.students} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {school.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">eco-points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImpactTracker;