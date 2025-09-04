import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Plus, User, Clock, Heart, Recycle, TreePine, Globe, MessageCircle, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: "climate" | "recycling" | "biodiversity";
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
  comments: Comment[];
}

const Forum = () => {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Tips for reducing plastic waste in daily life",
      author: "EcoWarrior23",
      category: "recycling",
      content: "I've been trying to reduce my plastic consumption and wanted to share some tips that have worked for me. What are your favorite plastic alternatives?",
      timestamp: "2 hours ago",
      replies: 12,
      likes: 24,
      comments: [
        {
          id: "c1",
          author: "GreenThumb",
          content: "Great tips! I've also started using beeswax wraps instead of plastic wrap.",
          timestamp: "1 hour ago",
          likes: 5
        }
      ]
    },
    {
      id: "2", 
      title: "Climate change impact on local wildlife",
      author: "NatureLover",
      category: "climate",
      content: "Has anyone noticed changes in local bird migration patterns? I'm documenting shifts in my area and would love to hear your observations.",
      timestamp: "5 hours ago",
      replies: 8,
      likes: 18,
      comments: []
    },
    {
      id: "3",
      title: "Creating a pollinator garden",
      author: "BeeKeeper88",
      category: "biodiversity", 
      content: "Planning to convert my lawn into a native pollinator garden. Looking for advice on the best plants for my region!",
      timestamp: "1 day ago",
      replies: 15,
      likes: 31,
      comments: []
    }
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "", category: "climate" as const });
  const [newComment, setNewComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "climate": return Globe;
      case "recycling": return Recycle;
      case "biodiversity": return TreePine;
      default: return MessageSquare;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "climate": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "recycling": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "biodiversity": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        title: newDiscussion.title,
        author: "You",
        category: newDiscussion.category,
        content: newDiscussion.content,
        timestamp: "Just now",
        replies: 0,
        likes: 0,
        comments: []
      };
      
      setDiscussions(prev => [discussion, ...prev]);
      setNewDiscussion({ title: "", content: "", category: "climate" });
      setIsDialogOpen(false);
      
      toast({
        title: "Discussion Created! 🌱",
        description: "Your discussion has been posted to the community forum."
      });
    }
  };

  const handleAddComment = (discussionId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        content: newComment,
        timestamp: "Just now",
        likes: 0
      };

      setDiscussions(prev => prev.map(discussion => 
        discussion.id === discussionId 
          ? { 
              ...discussion, 
              comments: [...discussion.comments, comment],
              replies: discussion.replies + 1
            }
          : discussion
      ));

      setNewComment("");
      
      toast({
        title: "Comment Added! 💬",
        description: "Your comment has been added to the discussion."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-green-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <MessageSquare className="h-10 w-10 text-primary animate-pulse" />
            Community Forum
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Connect with fellow eco-warriors and share your green journey
          </p>
          
          {/* Create Discussion Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-6" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Start New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    placeholder="Enter discussion title..."
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-background"
                    value={newDiscussion.category}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, category: e.target.value as any }))}
                  >
                    <option value="climate">Climate Change</option>
                    <option value="recycling">Recycling & Waste</option>
                    <option value="biodiversity">Biodiversity</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Share your thoughts, questions, or ideas..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreateDiscussion} className="w-full">
                  Create Discussion
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {discussions.map((discussion) => {
            const IconComponent = getCategoryIcon(discussion.category);
            const isExpanded = selectedDiscussion?.id === discussion.id;
            
            return (
              <Card key={discussion.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setSelectedDiscussion(isExpanded ? null : discussion)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <Badge className={getCategoryColor(discussion.category)}>
                          {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors">
                        {discussion.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {discussion.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {discussion.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{discussion.content}</p>
                    
                    {/* Comments Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Comments</h4>
                      
                      {discussion.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Comment */}
                      <div className="mt-4">
                        <Textarea 
                          placeholder="Add your comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                        />
                        <Button 
                          className="mt-2"
                          onClick={() => handleAddComment(discussion.id)}
                          disabled={!newComment.trim()}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Community Stats */}
        <Card className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">Community Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">{discussions.length}</p>
                <p className="text-sm text-muted-foreground">Active Discussions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">
                  {discussions.reduce((sum, d) => sum + d.comments.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Comments Posted</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {discussions.reduce((sum, d) => sum + d.likes, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Forum;