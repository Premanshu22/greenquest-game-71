import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizManagement } from "@/components/quiz/QuizManagement";
import { useQuizStorage } from "@/hooks/useQuizStorage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Plus, 
  Upload, 
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Download,
  Filter,
  Search
} from "lucide-react";

const TeacherDashboard = () => {
  const { quizzes, courses } = useQuizStorage();
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");

  const stats = [
    { icon: Users, value: "45", label: "Active Students", color: "text-primary", trend: "+12%" },
    { icon: BookOpen, value: "8", label: "Active Quizzes", color: "text-success", trend: "+2" },
    { icon: TrendingUp, value: "87%", label: "Avg. Completion", color: "text-warning", trend: "+5%" },
    { icon: Award, value: "234", label: "Badges Earned", color: "text-purple-500", trend: "+18" }
  ];

  const studentProgress = [
    { name: "Emma Watson", class: "Grade 10A", progress: 95, quizzes: 8, badges: 12, lastActive: "2 hours ago", status: "excellent" },
    { name: "Marcus Chen", class: "Grade 10B", progress: 78, quizzes: 6, badges: 8, lastActive: "1 day ago", status: "good" },
    { name: "Sofia Rodriguez", class: "Grade 10A", progress: 92, quizzes: 7, badges: 11, lastActive: "3 hours ago", status: "excellent" },
    { name: "James Wilson", class: "Grade 10C", progress: 65, quizzes: 5, badges: 6, lastActive: "2 days ago", status: "needs-attention" },
    { name: "Aisha Patel", class: "Grade 10B", progress: 88, quizzes: 7, badges: 9, lastActive: "5 hours ago", status: "good" },
    { name: "Oliver Kim", class: "Grade 10A", progress: 45, quizzes: 3, badges: 4, lastActive: "1 week ago", status: "needs-attention" }
  ];

  const recentQuizzes = [
    { title: "Climate Change Basics", students: 42, avgScore: 85, created: "2 days ago", status: "active" },
    { title: "Renewable Energy", students: 38, avgScore: 79, created: "1 week ago", status: "active" },
    { title: "Water Conservation", students: 45, avgScore: 92, created: "3 days ago", status: "active" },
    { title: "Forest Ecosystems", students: 35, avgScore: 76, created: "2 weeks ago", status: "archived" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success bg-success/10 border-success/30";
      case "good": return "text-primary bg-primary/10 border-primary/30";
      case "needs-attention": return "text-warning bg-warning/10 border-warning/30";
      default: return "text-muted-foreground bg-muted/10 border-muted/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-4 w-4" />;
      case "good": return <Target className="h-4 w-4" />;
      case "needs-attention": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Teacher <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage your students' environmental education journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-eco animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  <Badge variant="outline" className="text-success border-success/30 text-xs">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-accent/20">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="card-eco animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Class Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grade 10A Average</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-3 progress-eco" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grade 10B Average</span>
                      <span className="font-semibold">84%</span>
                    </div>
                    <Progress value={84} className="h-3 progress-eco" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grade 10C Average</span>
                      <span className="font-semibold">76%</span>
                    </div>
                    <Progress value={76} className="h-3 progress-eco" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="card-eco animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Emma completed Climate Change quiz", time: "2 hours ago", type: "completion" },
                      { action: "New quiz 'Water Conservation' published", time: "3 hours ago", type: "creation" },
                      { action: "Marcus earned 'Eco Warrior' badge", time: "1 day ago", type: "achievement" },
                      { action: "Class average improved by 5%", time: "2 days ago", type: "improvement" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'completion' ? 'bg-success' :
                          activity.type === 'creation' ? 'bg-primary' :
                          activity.type === 'achievement' ? 'bg-warning' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="card-eco animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Student Progress
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentProgress.map((student, index) => (
                    <div 
                      key={index} 
                      className="leaderboard-row p-4 flex items-center gap-4 hover:bg-accent/30"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-sm text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          <Badge variant="outline" className="text-xs">{student.class}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{student.quizzes} quizzes completed</span>
                          <span>{student.badges} badges earned</span>
                          <span>Last active: {student.lastActive}</span>
                        </div>
                      </div>

                      <div className="hidden md:block text-center min-w-[100px]">
                        <div className="text-sm text-muted-foreground mb-1">Progress</div>
                        <div className="flex items-center gap-2">
                          <Progress value={student.progress} className="h-2 w-16" />
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </div>

                      <Badge className={`${getStatusColor(student.status)} flex items-center gap-1`}>
                        {getStatusIcon(student.status)}
                        {student.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <QuizManagement quizzes={quizzes} courses={courses} />
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Create Quiz Form */}
              <Card className="card-eco animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Create New Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Quiz Title</label>
                    <Input 
                      placeholder="e.g., Ocean Pollution Awareness" 
                      value={newQuizTitle}
                      onChange={(e) => setNewQuizTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                    <Textarea 
                      placeholder="Describe what students will learn..."
                      value={newQuizDescription}
                      onChange={(e) => setNewQuizDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                      <select className="w-full p-2 border border-border rounded-lg bg-background">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Time Limit (min)</label>
                      <Input type="number" placeholder="30" />
                    </div>
                  </div>

                  <Button className="w-full btn-eco-hero">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Quiz
                  </Button>
                </CardContent>
              </Card>

              {/* Upload Content */}
              <Card className="card-eco animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Course Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">Support for PDF, DOCX, PPT, and image files</p>
                    <Button variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Recent Uploads</h4>
                    {[
                      { name: "Climate_Change_Slides.pptx", size: "2.4 MB", type: "presentation" },
                      { name: "Recycling_Guidelines.pdf", size: "1.8 MB", type: "document" },
                      { name: "Eco_Infographic.png", size: "950 KB", type: "image" }
                    ].map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;