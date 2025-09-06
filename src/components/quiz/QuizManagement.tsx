import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Eye,
  Copy,
  Download,
  Upload,
  Trash2,
  BookOpen,
  Clock,
  Users,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Quiz, Course, useQuizStorage } from "@/hooks/useQuizStorage";
import { QuizBuilder } from "./QuizBuilder";
import { QuizPreview } from "./QuizPreview";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface QuizManagementProps {
  quizzes: Quiz[];
  courses: Course[];
}

export const QuizManagement: React.FC<QuizManagementProps> = ({
  quizzes,
  courses
}) => {
  const { toast } = useToast();
  const {
    updateQuiz,
    deleteQuiz,
    duplicateQuiz,
    exportQuiz,
    importQuiz
  } = useQuizStorage();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [previewingQuiz, setPreviewingQuiz] = useState<Quiz | null>(null);
  const [deletingQuiz, setDeletingQuiz] = useState<Quiz | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter quizzes based on search and filters
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || quiz.status === statusFilter;
    const matchesCourse = courseFilter === "all" || quiz.courseId === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleCreateQuiz = () => {
    setEditingQuiz(null);
    setShowQuizBuilder(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setShowQuizBuilder(true);
  };

  const handlePreviewQuiz = (quiz: Quiz) => {
    setPreviewingQuiz(quiz);
  };

  const handleDuplicateQuiz = (quiz: Quiz) => {
    try {
      const duplicated = duplicateQuiz(quiz.id);
      if (duplicated) {
        toast({
          title: "Quiz Duplicated",
          description: `"${duplicated.title}" has been created as a copy.`
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate quiz.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = (quiz: Quiz) => {
    const newStatus = quiz.status === "published" ? "draft" : "published";
    
    if (newStatus === "published") {
      // Show warning about frontend-only publishing
      if (confirm(
        "This will mark the quiz as published in the frontend only. " +
        "Backend integration is required to make it live for students. Continue?"
      )) {
        updateQuiz(quiz.id, { status: newStatus });
        toast({
          title: `Quiz Published`,
          description: `"${quiz.title}" status updated to published.`
        });
      }
    } else {
      updateQuiz(quiz.id, { status: newStatus });
      toast({
        title: `Quiz Unpublished`,
        description: `"${quiz.title}" status updated to draft.`
      });
    }
  };

  const handleExportQuiz = (quiz: Quiz) => {
    try {
      exportQuiz(quiz.id);
      toast({
        title: "Quiz Exported",
        description: `"${quiz.title}" has been downloaded as JSON.`
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export quiz.",
        variant: "destructive"
      });
    }
  };

  const handleImportQuiz = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const quizData = JSON.parse(e.target?.result as string);
        const imported = importQuiz(quizData);
        toast({
          title: "Quiz Imported",
          description: `"${imported.title}" has been imported successfully.`
        });
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Invalid quiz file format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };

  const handleDeleteQuiz = () => {
    if (!deletingQuiz) return;
    
    try {
      deleteQuiz(deletingQuiz.id);
      toast({
        title: "Quiz Deleted",
        description: `"${deletingQuiz.title}" has been deleted.`
      });
      setDeletingQuiz(null);
    } catch (error) {
      toast({
        title: "Delete Error",
        description: "Failed to delete quiz.",
        variant: "destructive"
      });
    }
  };

  const getCourseName = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.name || "Unknown Course";
  };

  const getStatusBadge = (status: string) => {
    if (status === "published") {
      return (
        <Badge className="bg-success text-success-foreground">
          <CheckCircle className="h-3 w-3 mr-1" />
          Published
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        <AlertCircle className="h-3 w-3 mr-1" />
        Draft
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Quiz Management</h3>
          <p className="text-sm text-muted-foreground">
            Create, edit, and manage your quizzes
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImportQuiz}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={handleCreateQuiz} className="btn-eco-glow">
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
            <p className="text-muted-foreground mb-4 text-center">
              {searchTerm || statusFilter !== "all" || courseFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first quiz to get started"
              }
            </p>
            {(!searchTerm && statusFilter === "all" && courseFilter === "all") && (
              <Button onClick={handleCreateQuiz}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Quiz
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="card-interactive">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{quiz.title}</CardTitle>
                    <p className="text-sm text-muted-foreground truncate">
                      {getCourseName(quiz.courseId)}
                    </p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditQuiz(quiz)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePreviewQuiz(quiz)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateQuiz(quiz)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportQuiz(quiz)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleToggleStatus(quiz)}
                        className={quiz.status === "published" ? "text-warning" : "text-success"}
                      >
                        {quiz.status === "published" ? "Unpublish" : "Publish"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeletingQuiz(quiz)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  {getStatusBadge(quiz.status)}
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(quiz.updatedAt), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-accent/50 rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">{quiz.questions.length}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">
                      {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                </div>

                {quiz.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {quiz.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {quiz.timeLimitMinutes && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {quiz.timeLimitMinutes} min
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewQuiz(quiz)}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditQuiz(quiz)}
                    className="flex-1"
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Quiz Builder Modal */}
      <QuizBuilder
        isOpen={showQuizBuilder}
        onClose={() => {
          setShowQuizBuilder(false);
          setEditingQuiz(null);
        }}
        editingQuiz={editingQuiz}
        courses={courses}
      />

      {/* Quiz Preview Modal */}
      {previewingQuiz && (
        <QuizPreview
          quiz={previewingQuiz}
          isOpen={true}
          onClose={() => setPreviewingQuiz(null)}
          onBack={() => setPreviewingQuiz(null)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingQuiz} onOpenChange={() => setDeletingQuiz(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingQuiz?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuiz}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};