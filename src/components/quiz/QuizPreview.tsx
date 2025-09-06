import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, X, Clock, Award } from "lucide-react";
import { Quiz, QuizQuestion } from "@/hooks/useQuizStorage";

interface QuizPreviewProps {
  quiz: Quiz;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface Answer {
  questionId: string;
  selectedOptions?: string[];
  textAnswer?: string;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({
  quiz,
  isOpen,
  onClose,
  onBack
}) => {
  const [mode, setMode] = useState<'preview' | 'take' | 'results'>('preview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimitMinutes ? quiz.timeLimitMinutes * 60 : null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  const resetQuiz = () => {
    setMode('take');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(quiz.timeLimitMinutes ? quiz.timeLimitMinutes * 60 : null);
  };

  const handleAnswerChange = (questionId: string, type: string, value: any) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      const updated = { ...existing, questionId };

      if (type === 'mcq' || type === 'truefalse') {
        updated.selectedOptions = [value];
      } else if (type === 'multi') {
        const current = existing?.selectedOptions || [];
        updated.selectedOptions = current.includes(value)
          ? current.filter(id => id !== value)
          : [...current, value];
      } else if (type === 'short') {
        updated.textAnswer = value;
      }

      return prev.some(a => a.questionId === questionId)
        ? prev.map(a => a.questionId === questionId ? updated : a)
        : [...prev, updated];
    });
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const answer = answers.find(a => a.questionId === question.id);
      
      if (!answer) return;

      if (question.type === 'short') {
        // For short answers, give full points if expected answer matches (case insensitive)
        if (question.expectedAnswer && answer.textAnswer?.toLowerCase().trim() === question.expectedAnswer.toLowerCase().trim()) {
          earnedPoints += question.points;
        }
      } else if (question.options) {
        const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.id);
        const selectedOptions = answer.selectedOptions || [];

        if (question.type === 'mcq' || question.type === 'truefalse') {
          // Single answer: must select exactly the correct option
          if (selectedOptions.length === 1 && correctOptions.includes(selectedOptions[0])) {
            earnedPoints += question.points;
          }
        } else if (question.type === 'multi') {
          // Multiple answers: partial credit based on correct selections
          const correctSelected = selectedOptions.filter(id => correctOptions.includes(id)).length;
          const incorrectSelected = selectedOptions.filter(id => !correctOptions.includes(id)).length;
          
          if (correctSelected > 0 && incorrectSelected === 0) {
            // Only give points if no incorrect options were selected
            const percentage = correctSelected / correctOptions.length;
            earnedPoints += question.points * percentage;
          }
        }
      }
    });

    return {
      totalPoints,
      earnedPoints: Math.round(earnedPoints * 100) / 100,
      percentage: Math.round((earnedPoints / totalPoints) * 100)
    };
  };

  const getQuestionResult = (question: QuizQuestion) => {
    const answer = answers.find(a => a.questionId === question.id);
    if (!answer) return { correct: false, partial: false };

    if (question.type === 'short') {
      const isCorrect = question.expectedAnswer && 
        answer.textAnswer?.toLowerCase().trim() === question.expectedAnswer.toLowerCase().trim();
      return { correct: isCorrect, partial: false };
    }

    if (!question.options) return { correct: false, partial: false };

    const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.id);
    const selectedOptions = answer.selectedOptions || [];

    if (question.type === 'mcq' || question.type === 'truefalse') {
      const isCorrect = selectedOptions.length === 1 && correctOptions.includes(selectedOptions[0]);
      return { correct: isCorrect, partial: false };
    }

    if (question.type === 'multi') {
      const correctSelected = selectedOptions.filter(id => correctOptions.includes(id)).length;
      const incorrectSelected = selectedOptions.filter(id => !correctOptions.includes(id)).length;
      
      const isFullyCorrect = correctSelected === correctOptions.length && incorrectSelected === 0;
      const isPartial = correctSelected > 0 && incorrectSelected === 0 && correctSelected < correctOptions.length;
      
      return { correct: isFullyCorrect, partial: isPartial };
    }

    return { correct: false, partial: false };
  };

  const renderQuestionContent = (question: QuizQuestion, isPreview: boolean = false) => {
    if (question.type === 'short') {
      return (
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your answer here..."
            value={currentAnswer?.textAnswer || ''}
            onChange={(e) => !isPreview && handleAnswerChange(question.id, 'short', e.target.value)}
            disabled={isPreview}
            rows={3}
          />
        </div>
      );
    }

    if (!question.options) return null;

    if (question.type === 'mcq' || question.type === 'truefalse') {
      return (
        <RadioGroup
          value={currentAnswer?.selectedOptions?.[0] || ''}
          onValueChange={(value) => !isPreview && handleAnswerChange(question.id, 'mcq', value)}
          disabled={isPreview}
        >
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <label htmlFor={option.id} className="text-sm cursor-pointer flex-1">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </RadioGroup>
      );
    }

    if (question.type === 'multi') {
      return (
        <div className="space-y-3">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={currentAnswer?.selectedOptions?.includes(option.id) || false}
                onCheckedChange={() => !isPreview && handleAnswerChange(question.id, 'multi', option.id)}
                disabled={isPreview}
              />
              <label htmlFor={option.id} className="text-sm cursor-pointer flex-1">
                {option.text}
              </label>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderResults = () => {
    const score = calculateScore();
    
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Quiz Complete!</h3>
            <p className="text-muted-foreground">Here are your results</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{score.percentage}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{score.earnedPoints}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{score.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h4 className="font-medium">Question Breakdown</h4>
          {quiz.questions.map((question, index) => {
            const result = getQuestionResult(question);
            return (
              <Card key={question.id} className="border-l-4 border-l-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <span className="text-sm font-medium">{question.prompt}</span>
                      </div>
                      {question.explanation && (
                        <div className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        result.correct 
                          ? 'bg-success text-success-foreground' 
                          : result.partial 
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-destructive text-destructive-foreground'
                      }>
                        {result.correct ? 'Correct' : result.partial ? 'Partial' : 'Incorrect'}
                      </Badge>
                      <span className="text-sm font-medium">{question.points} pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  if (mode === 'results') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz Results: {quiz.title}</DialogTitle>
          </DialogHeader>
          
          {renderResults()}

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={() => setMode('preview')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Preview
            </Button>
            <Button onClick={resetQuiz}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'take') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{quiz.title}</DialogTitle>
              {timeRemaining && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
              <Badge variant="outline">{currentQuestion.points} points</Badge>
            </div>

            <Progress value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} className="h-2" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentQuestion.prompt}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderQuestionContent(currentQuestion)}
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button 
                onClick={() => setMode('results')}
                className="btn-eco-glow"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finish Quiz
              </Button>
            ) : (
              <Button 
                onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Quiz Preview: {quiz.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold text-lg">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div>
                  <div className="font-bold text-lg">
                    {quiz.questions.reduce((sum, q) => sum + q.points, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div>
                  <div className="font-bold text-lg">
                    {quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} min` : 'No limit'}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Limit</div>
                </div>
                <div>
                  <div className="font-bold text-lg capitalize">{quiz.status}</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {quiz.description && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h4 className="font-medium">Questions Preview</h4>
            {quiz.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      <div>
                        <CardTitle className="text-base">{question.prompt}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {question.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.points} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderQuestionContent(question, true)}
                  {question.explanation && (
                    <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                      <div className="text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
          <Button onClick={resetQuiz} className="btn-eco-glow">
            Take Quiz as Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};