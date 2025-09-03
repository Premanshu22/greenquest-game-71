import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Leaf, TreePine, Camera, Trophy, Lock, CheckCircle, Upload, Target, Globe } from "lucide-react";

const EcoMissions = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [completedMissions, setCompletedMissions] = useState(3);

  const currentMission = {
    title: "Plant a Tree Challenge",
    description: "Plant a tree in your local area and upload a photo to earn 150 XP and unlock the 'Tree Guardian' badge!",
    reward: 150,
    badge: "Tree Guardian",
    deadline: "6 days remaining",
    difficulty: "Easy"
  };

  const pastMissions = [
    { id: 1, title: "Plastic-Free Week", status: "completed", xp: 100, badge: "Plastic Warrior" },
    { id: 2, title: "Energy Saver Challenge", status: "completed", xp: 120, badge: "Energy Hero" },
    { id: 3, title: "Water Conservation", status: "completed", xp: 80, badge: "Water Guardian" },
    { id: 4, title: "Sustainable Transport", status: "locked", xp: 200, badge: "Green Commuter" },
    { id: 5, title: "Zero Waste Day", status: "locked", xp: 180, badge: "Waste Warrior" },
    { id: 6, title: "Local Food Challenge", status: "locked", xp: 90, badge: "Local Hero" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitProof = () => {
    if (selectedFile || description.trim()) {
      setCompletedMissions(prev => prev + 1);
      setSelectedFile(null);
      setDescription("");
      // Here you would typically submit to your backend
      alert("Mission proof submitted successfully! 🌱");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5">
      {/* Floating leaves animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute top-20 left-10 opacity-20">
          <Leaf className="h-8 w-8 text-success rotate-12" />
        </div>
        <div className="animate-float absolute top-40 right-20 opacity-15" style={{ animationDelay: '2s' }}>
          <TreePine className="h-12 w-12 text-primary rotate-45" />
        </div>
        <div className="animate-float absolute bottom-40 left-1/4 opacity-10" style={{ animationDelay: '4s' }}>
          <Leaf className="h-6 w-6 text-success -rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
            Eco-Missions – Learn by Doing
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Weekly challenges to make a real impact on the planet
          </p>
          
          {/* Progress Counter */}
          <Card className="max-w-md mx-auto bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">
                  You have completed <span className="text-primary">{completedMissions}</span> eco-missions so far!
                </span>
              </div>
              <Progress value={(completedMissions / 10) * 100} className="mt-4" />
            </CardContent>
          </Card>
        </div>

        {/* Current Weekly Mission */}
        <section className="mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-foreground">This Week's Mission</h2>
            <Badge variant="outline" className="text-primary border-primary">
              <Target className="h-4 w-4 mr-2" />
              {currentMission.deadline}
            </Badge>
          </div>

          <Card className="max-w-4xl mx-auto shadow-2xl border-primary/20 bg-gradient-to-br from-card to-success/5">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center">
                  <TreePine className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-primary">{currentMission.title}</CardTitle>
              <CardDescription className="text-lg">{currentMission.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-success/10 rounded-lg">
                  <Trophy className="h-8 w-8 text-success mx-auto mb-2" />
                  <p className="font-semibold">Reward</p>
                  <p className="text-success">{currentMission.reward} XP</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Badge className="h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Leaf className="h-4 w-4" />
                  </Badge>
                  <p className="font-semibold">Badge</p>
                  <p className="text-primary">{currentMission.badge}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-semibold">Difficulty</p>
                  <p>{currentMission.difficulty}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90 text-white">
                      <Camera className="h-5 w-5 mr-2" />
                      Submit Proof
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Submit Your Mission Proof</DialogTitle>
                      <DialogDescription>
                        Upload a photo or write a description of your completed mission.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="photo">Upload Photo</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="flex-1"
                          />
                          {selectedFile && (
                            <Badge variant="outline" className="text-success border-success">
                              <Upload className="h-3 w-3 mr-1" />
                              Ready
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                          id="description"
                          placeholder="Tell us about your mission completion..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <Button 
                        onClick={handleSubmitProof}
                        className="w-full bg-gradient-to-r from-success to-primary"
                        disabled={!selectedFile && !description.trim()}
                      >
                        Submit Mission Proof
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Past Missions Grid */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold text-center mb-8">Mission History</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pastMissions.map((mission) => (
              <Card 
                key={mission.id} 
                className={`transition-all duration-300 hover:scale-105 ${
                  mission.status === 'completed' 
                    ? 'bg-gradient-to-br from-success/10 to-primary/10 border-success/30 shadow-lg' 
                    : 'bg-muted/30 border-muted'
                }`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-3">
                    {mission.status === 'completed' ? (
                      <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardTitle className={`text-lg ${mission.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {mission.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-3">
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-1">
                      <Trophy className={`h-4 w-4 ${mission.status === 'completed' ? 'text-success' : 'text-muted-foreground'}`} />
                      <span className="text-sm">{mission.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className="h-4 w-4 rounded-full flex items-center justify-center p-0">
                        <Leaf className="h-2 w-2" />
                      </Badge>
                      <span className="text-sm">{mission.badge}</span>
                    </div>
                  </div>
                  
                  <Badge variant={mission.status === 'completed' ? 'default' : 'secondary'}>
                    {mission.status === 'completed' ? 'Completed' : 'Locked'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EcoMissions;