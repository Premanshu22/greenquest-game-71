import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Save, Eye, X, AlertCircle } from "lucide-react";
import { Quiz, Course, useQuizStorage } from "@/hooks/useQuizStorage";
import { QuestionEditor } from "./QuestionEditor";
import { QuizPreview } from "./QuizPreview";
import { useToast } from "@/hooks/use-toast";

interface QuizBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  editingQuiz?: Quiz | null;
  courses: Course[];
}

const STEPS = [
  { id: 1, title: "Quiz Info", description: "Basic information" },
  { id: 2, title: "Questions", description: "Add and edit questions" },
  { id: 3, title: "Review", description: "Review and save" }
];

export const QuizBuilder: React.FC<QuizBuilderProps> = ({
  isOpen,
  onClose,
  editingQuiz,
  courses
}) => {
  const { toast } = useToast();
  const { createQuiz, updateQuiz } = useQuizStorage();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Quiz form data
  const [formData, setFormData] = useState<Partial<Quiz>>({
    title: "",
    description: "",
    courseId: "",
    status: "draft",
    timeLimitMinutes: 30,
    questions: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when editing a quiz
  useEffect(() => {
    if (editingQuiz) {
      setFormData(editingQuiz);
      setCurrentStep(2); // Start at questions step when editing
    } else {
      setFormData({
        title: "",
        description: "",
        courseId: "",
        status: "draft",
        timeLimitMinutes: 30,
        questions: []
      });
      setCurrentStep(1);
    }
    setHasUnsavedChanges(false);
    setErrors({});
  }, [editingQuiz, isOpen]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title?.trim()) {
        newErrors.title = "Quiz title is required";
      }
      if (!formData.courseId) {
        newErrors.courseId = "Please select a course";
      }
    }

    if (step === 2) {
      if (!formData.questions?.length) {
        newErrors.questions = "At least one question is required";
      } else {
        // Validate each question
        formData.questions.forEach((question, index) => {
          if (!question.prompt?.trim()) {
            newErrors[`question_${index}`] = `Question ${index + 1} prompt is required`;
          }
          if ((question.type === 'mcq' || question.type === 'multi') && 
              (!question.options?.length || question.options.length < 2)) {
            newErrors[`question_${index}_options`] = `Question ${index + 1} needs at least 2 options`;
          }
          if ((question.type === 'mcq' || question.type === 'multi') &&
              !question.options?.some(opt => opt.correct)) {
            newErrors[`question_${index}_correct`] = `Question ${index + 1} needs at least one correct answer`;
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before saving.",
        variant: "destructive"
      });
      return;
    }

    try {
      const quizData = {
        ...formData,
        teacherId: "demo_teacher_1"
      } as Quiz;

      if (editingQuiz) {
        updateQuiz(editingQuiz.id, quizData);
        toast({
          title: "Quiz Updated",
          description: `"${formData.title}" has been updated successfully.`
        });
      } else {
        createQuiz(quizData);
        toast({
          title: "Quiz Created",
          description: `"${formData.title}" has been created successfully.`
        });
      }

      setHasUnsavedChanges(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (showPreview) {
    return (
      <QuizPreview
        quiz={formData as Quiz}
        isOpen={true}
        onClose={() => setShowPreview(false)}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
              {hasUnsavedChanges && (
                <Badge variant="outline" className="ml-2 text-warning border-warning/30">
                  Unsaved Changes
                </Badge>
              )}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quiz Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Climate Change Fundamentals"
                    value={formData.title || ""}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course *</Label>
                  <Select
                    value={formData.courseId || ""}
                    onValueChange={(value) => handleFormChange("courseId", value)}
                  >
                    <SelectTrigger className={errors.courseId ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} ({course.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.courseId && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.courseId}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this quiz..."
                  value={formData.description || ""}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="1"
                    max="180"
                    placeholder="30"
                    value={formData.timeLimitMinutes || ""}
                    onChange={(e) => handleFormChange("timeLimitMinutes", parseInt(e.target.value) || undefined)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select
                    value={formData.status || "draft"}
                    onValueChange={(value) => handleFormChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Questions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  disabled={!formData.questions?.length}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Quiz
                </Button>
              </div>
              
              <QuestionEditor
                questions={formData.questions || []}
                onChange={(questions) => handleFormChange("questions", questions)}
                errors={errors}
              />
              
              {errors.questions && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.questions}
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review & Save</h3>
              
              <div className="bg-accent/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Title</Label>
                    <div className="font-medium">{formData.title}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Course</Label>
                    <div className="font-medium">
                      {courses.find(c => c.id === formData.courseId)?.name}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Questions</Label>
                    <div className="font-medium">{formData.questions?.length || 0}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Time Limit</Label>
                    <div className="font-medium">
                      {formData.timeLimitMinutes ? `${formData.timeLimitMinutes} minutes` : 'No limit'}
                    </div>
                  </div>
                </div>
                
                {formData.description && (
                  <div>
                    <Label className="text-muted-foreground">Description</Label>
                    <div className="text-sm">{formData.description}</div>
                  </div>
                )}
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-primary">Ready to Save</div>
                    <div className="text-sm text-muted-foreground">
                      {editingQuiz 
                        ? "Your changes will be saved and the quiz will be updated."
                        : "Your quiz will be created and saved to your quiz library."
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < STEPS.length ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave} className="btn-eco-glow">
                <Save className="h-4 w-4 mr-2" />
                {editingQuiz ? "Update Quiz" : "Create Quiz"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};