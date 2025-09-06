import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Copy, 
  AlertCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { QuizQuestion, QuizOption } from "@/hooks/useQuizStorage";

interface QuestionEditorProps {
  questions: QuizQuestion[];
  onChange: (questions: QuizQuestion[]) => void;
  errors: Record<string, string>;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  questions,
  onChange,
  errors
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const generateId = (prefix: string) => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: generateId('q'),
      type: 'mcq',
      prompt: '',
      options: [
        { id: generateId('o'), text: '', correct: false },
        { id: generateId('o'), text: '', correct: false }
      ],
      points: 5
    };

    const updatedQuestions = [...questions, newQuestion];
    onChange(updatedQuestions);
    setExpandedQuestion(newQuestion.id);
  };

  const updateQuestion = (questionId: string, updates: Partial<QuizQuestion>) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    );
    onChange(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      onChange(updatedQuestions);
      if (expandedQuestion === questionId) {
        setExpandedQuestion(null);
      }
    }
  };

  const duplicateQuestion = (questionId: string) => {
    const originalQuestion = questions.find(q => q.id === questionId);
    if (!originalQuestion) return;

    const duplicatedQuestion: QuizQuestion = {
      ...originalQuestion,
      id: generateId('q'),
      prompt: `${originalQuestion.prompt} (Copy)`,
      options: originalQuestion.options?.map(opt => ({
        ...opt,
        id: generateId('o')
      }))
    };

    const originalIndex = questions.findIndex(q => q.id === questionId);
    const updatedQuestions = [
      ...questions.slice(0, originalIndex + 1),
      duplicatedQuestion,
      ...questions.slice(originalIndex + 1)
    ];
    
    onChange(updatedQuestions);
    setExpandedQuestion(duplicatedQuestion.id);
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= questions.length) return;

    const updatedQuestions = [...questions];
    [updatedQuestions[currentIndex], updatedQuestions[newIndex]] = 
    [updatedQuestions[newIndex], updatedQuestions[currentIndex]];

    onChange(updatedQuestions);
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.options) return;

    const newOption: QuizOption = {
      id: generateId('o'),
      text: '',
      correct: false
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption]
    });
  };

  const updateOption = (questionId: string, optionId: string, updates: Partial<QuizOption>) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.options) return;

    const updatedOptions = question.options.map(opt =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.options || question.options.length <= 2) return;

    const updatedOptions = question.options.filter(opt => opt.id !== optionId);
    updateQuestion(questionId, { options: updatedOptions });
  };

  const handleCorrectOptionChange = (questionId: string, optionId: string, isMultiple: boolean) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.options) return;

    let updatedOptions;
    if (isMultiple) {
      // Multiple choice: toggle this option
      updatedOptions = question.options.map(opt =>
        opt.id === optionId ? { ...opt, correct: !opt.correct } : opt
      );
    } else {
      // Single choice: make this the only correct option
      updatedOptions = question.options.map(opt => ({
        ...opt,
        correct: opt.id === optionId
      }));
    }

    updateQuestion(questionId, { options: updatedOptions });
  };

  const getQuestionTypeOptions = () => [
    { value: 'mcq', label: 'Multiple Choice (Single Answer)' },
    { value: 'multi', label: 'Multiple Choice (Multiple Answers)' },
    { value: 'truefalse', label: 'True/False' },
    { value: 'short', label: 'Short Answer' }
  ];

  const renderQuestionContent = (question: QuizQuestion, index: number) => {
    const isExpanded = expandedQuestion === question.id;
    const questionError = errors[`question_${index}`];
    const optionsError = errors[`question_${index}_options`];
    const correctError = errors[`question_${index}_correct`];

    return (
      <Card key={question.id} className={`${questionError || optionsError || correctError ? 'border-destructive' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex flex-col items-center gap-1 mt-1">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <Badge variant="outline" className="text-xs">
                  Q{index + 1}
                </Badge>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">
                    {question.prompt || `Question ${index + 1}`}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {getQuestionTypeOptions().find(opt => opt.value === question.type)?.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {question.points} pts
                  </Badge>
                </div>
                
                {(questionError || optionsError || correctError) && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {questionError || optionsError || correctError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveQuestion(question.id, 'up')}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveQuestion(question.id, 'down')}
                disabled={index === questions.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Question Type</Label>
                <Select
                  value={question.type}
                  onValueChange={(value: any) => {
                    const updates: Partial<QuizQuestion> = { type: value };
                    
                    // Reset options based on question type
                    if (value === 'truefalse') {
                      updates.options = [
                        { id: generateId('o'), text: 'True', correct: false },
                        { id: generateId('o'), text: 'False', correct: false }
                      ];
                    } else if (value === 'short') {
                      updates.options = undefined;
                      updates.expectedAnswer = '';
                    } else if (!question.options || question.options.length < 2) {
                      updates.options = [
                        { id: generateId('o'), text: '', correct: false },
                        { id: generateId('o'), text: '', correct: false }
                      ];
                    }
                    
                    updateQuestion(question.id, updates);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getQuestionTypeOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Points</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={question.points}
                  onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 5 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Question Prompt *</Label>
              <Textarea
                placeholder="Enter your question here..."
                value={question.prompt}
                onChange={(e) => updateQuestion(question.id, { prompt: e.target.value })}
                className={questionError ? "border-destructive" : ""}
              />
            </div>

            {question.type === 'short' ? (
              <div className="space-y-2">
                <Label>Expected Answer (Optional)</Label>
                <Input
                  placeholder="Enter the expected answer for auto-validation"
                  value={question.expectedAnswer || ''}
                  onChange={(e) => updateQuestion(question.id, { expectedAnswer: e.target.value })}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Answer Options</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addOption(question.id)}
                    disabled={question.options && question.options.length >= 6}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-2">
                  {question.options?.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center gap-2">
                      {question.type === 'multi' ? (
                        <Checkbox
                          checked={option.correct}
                          onCheckedChange={() => handleCorrectOptionChange(question.id, option.id, true)}
                        />
                      ) : (
                        <RadioGroup
                          value={question.options?.find(opt => opt.correct)?.id || ''}
                          onValueChange={(value) => handleCorrectOptionChange(question.id, value, false)}
                        >
                          <RadioGroupItem value={option.id} />
                        </RadioGroup>
                      )}
                      
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.text}
                        onChange={(e) => updateOption(question.id, option.id, { text: e.target.value })}
                        className="flex-1"
                        disabled={question.type === 'truefalse'}
                      />
                      
                      {question.type !== 'truefalse' && question.options && question.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteOption(question.id, option.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Explanation (Optional)</Label>
              <Textarea
                placeholder="Explain why this is the correct answer..."
                value={question.explanation || ''}
                onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Questions ({questions.length})</h4>
          <p className="text-sm text-muted-foreground">
            Click on a question to expand and edit it
          </p>
        </div>
        <Button onClick={addQuestion} className="btn-eco-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-muted-foreground mb-4">
              No questions yet. Add your first question to get started.
            </div>
            <Button onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add First Question
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => renderQuestionContent(question, index))}
        </div>
      )}
    </div>
  );
};