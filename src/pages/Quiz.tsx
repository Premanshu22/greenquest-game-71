import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Award, 
  Zap,
  TreePine,
  Recycle,
  Sun,
  Droplets,
  Target,
  Trophy,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizzes = [
    {
      title: "Climate Change Basics",
      description: "Test your knowledge about global warming and climate science",
      icon: Sun,
      difficulty: "Beginner",
      questions: 5,
      time: "5 min",
      points: 100,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500"
    },
    {
      title: "Recycling & Waste",
      description: "Learn about proper recycling and waste management",
      icon: Recycle,
      difficulty: "Intermediate",
      questions: 8,
      time: "8 min", 
      points: 150,
      color: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      title: "Forest Conservation",
      description: "Explore the importance of forests and biodiversity",
      icon: TreePine,
      difficulty: "Advanced",
      questions: 10,
      time: "12 min",
      points: 200,
      color: "bg-gradient-to-br from-green-600 to-green-700"
    },
    {
      title: "Water Conservation",
      description: "Understand water cycle and conservation methods",
      icon: Droplets,
      difficulty: "Beginner",
      questions: 6,
      time: "6 min",
      points: 120,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    }
  ];

  const questions = [
    {
      question: "What is the primary cause of climate change?",
      options: [
        "Natural climate cycles",
        "Greenhouse gas emissions from human activities",
        "Solar radiation changes",
        "Ocean currents"
      ],
      correctAnswer: 1,
      explanation: "Human activities, particularly burning fossil fuels, release greenhouse gases that trap heat in the atmosphere."
    },
    {
      question: "Which renewable energy source is most widely used globally?",
      options: [
        "Solar power",
        "Wind power",
        "Hydroelectric power",
        "Geothermal power"
      ],
      correctAnswer: 2,
      explanation: "Hydroelectric power is currently the most widely used renewable energy source worldwide."
    },
    {
      question: "What percentage of plastic waste is actually recycled globally?",
      options: [
        "Less than 10%",
        "About 25%",
        "Around 50%",
        "More than 75%"
      ],
      correctAnswer: 0,
      explanation: "Unfortunately, less than 10% of plastic waste is actually recycled globally, highlighting the need for better waste management."
    },
    {
      question: "Which gas is the most abundant greenhouse gas in Earth's atmosphere?",
      options: [
        "Carbon dioxide (CO2)",
        "Methane (CH4)",
        "Water vapor (H2O)",
        "Nitrous oxide (N2O)"
      ],
      correctAnswer: 2,
      explanation: "Water vapor is the most abundant greenhouse gas, though human activities primarily affect CO2 levels."
    },
    {
      question: "How much of Earth's freshwater is accessible for human use?",
      options: [
        "About 30%",
        "Around 10%",
        "Less than 1%",
        "Approximately 5%"
      ],
      correctAnswer: 2,
      explanation: "Less than 1% of Earth's freshwater is accessible for human use, making water conservation crucial."
    }
  ];

  // Timer effect
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, quizCompleted, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      showCompletionToast();
    }
  };

  const showCompletionToast = () => {
    const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    toast({
      title: "Quiz Completed! 🎉",
      description: `You scored ${finalScore}/${questions.length} (${percentage}%). Great job learning about our environment!`,
    });
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-primary">GreenEdventure</span> Quizzes
            </h1>
            <p className="text-muted-foreground">Challenge yourself and learn about our environment!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => (
              <Card key={index} className="card-interactive group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 ${quiz.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <quiz.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{quiz.title}</h3>
                        <Badge className={`${getDifficultyColor(quiz.difficulty)} text-white text-xs`}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">{quiz.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          {quiz.questions} questions
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {quiz.time}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Target className="h-4 w-4" />
                          {quiz.points} pts
                        </div>
                      </div>
                      
                      <Button 
                        onClick={startQuiz} 
                        className="w-full btn-eco-glow group-hover:scale-105 transition-transform"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const earnedPoints = Math.round(100 * (percentage / 100));

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="card-eco text-center animate-bounce-in">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
                <p className="text-muted-foreground">Congratulations on completing the Climate Change Basics quiz!</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{finalScore}/{questions.length}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{percentage}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">+{earnedPoints}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
              </div>

              {percentage >= 80 && (
                <div className="mb-6 animate-bounce-in">
                  <Badge className="badge-eco text-lg px-6 py-2">
                    <Award className="h-5 w-5 mr-2" />
                    New Badge Earned: Climate Champion!
                  </Badge>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} className="btn-eco-glow">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Another Quiz
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Quiz Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Climate Change Basics</h1>
            <Badge className="badge-eco">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm">Progress: {Math.round(progress)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-sm">Time: {timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-success" />
              <span className="text-sm">Score: {score}/{questions.length}</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-3 progress-eco" />
        </div>

        {/* Question Card */}
        <Card className="card-eco animate-scale-in mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 h-auto justify-start transition-all duration-300 ${
                    selectedAnswer === index 
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? "bg-success text-success-foreground border-success"
                          : "bg-destructive text-destructive-foreground border-destructive"
                        : "bg-primary text-primary-foreground border-primary"
                      : showResult && index === currentQ.correctAnswer
                        ? "bg-success text-success-foreground border-success"
                        : "hover:bg-accent hover:scale-[1.02]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      selectedAnswer === index 
                        ? showResult
                          ? index === currentQ.correctAnswer ? "bg-white text-success" : "bg-white text-destructive"
                          : "bg-white text-primary"
                        : showResult && index === currentQ.correctAnswer
                          ? "bg-white text-success"
                          : "border-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                    {showResult && (
                      <div className="ml-auto">
                        {index === currentQ.correctAnswer ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="mt-6 p-4 bg-accent/30 rounded-lg border-l-4 border-primary animate-slide-up">
                <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
                <p className="text-foreground leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn-eco-hero"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              className="btn-eco-hero"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;