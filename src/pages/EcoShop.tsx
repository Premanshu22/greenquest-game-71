import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coins, TreePine, Palette, Target, Crown, Star, Sparkles, Eye, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "avatar" | "theme" | "mission";
  icon: any;
  available: boolean;
  image?: string;
  unlockCondition: string;
}

const EcoShop = () => {
  const { toast } = useToast();
  const [ecoCoins, setEcoCoins] = useState(1250);
  const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);
  const [confirmPurchase, setConfirmPurchase] = useState<ShopItem | null>(null);
  const [animatingBalance, setAnimatingBalance] = useState(false);

  const maxCoins = 2000;
  const progressPercentage = (ecoCoins / maxCoins) * 100;

  const shopItems: ShopItem[] = [
    {
      id: "forest-avatar",
      name: "Forest Guardian Avatar",
      description: "Become a protector of the forest with this nature-themed avatar",
      cost: 500,
      category: "avatar",
      icon: TreePine,
      available: true,
      image: "/placeholder.svg",
      unlockCondition: "Complete 5 missions"
    },
    {
      id: "ocean-theme",
      name: "Ocean Blue Theme",
      description: "Transform your interface with calming ocean colors",
      cost: 300,
      category: "theme", 
      icon: Palette,
      available: true,
      image: "/placeholder.svg",
      unlockCondition: "Reach level 10"
    },
    {
      id: "bonus-mission",
      name: "Clean Beach Mission",
      description: "Unlock an exclusive beach cleanup challenge",
      cost: 200,
      category: "mission",
      icon: Target,
      available: true,
      image: "/placeholder.svg",
      unlockCondition: "Available to all"
    },
    {
      id: "premium-avatar",
      name: "Eco-Warrior Crown",
      description: "Show your eco-leadership with this golden crown",
      cost: 1000,
      category: "avatar",
      icon: Crown,
      available: true,
      image: "/placeholder.svg",
      unlockCondition: "Reach top 10 on leaderboard"
    },
    {
      id: "sunrise-theme",
      name: "Sunrise Theme",
      description: "Start each day with warm, inspiring colors",
      cost: 400,
      category: "theme",
      icon: Star,
      available: true,
      image: "/placeholder.svg",
      unlockCondition: "Complete daily challenge 7 days"
    },
    {
      id: "rare-mission",
      name: "Rare Species Mission",
      description: "Help document endangered species in your area",
      cost: 800,
      category: "mission",
      icon: Sparkles,
      available: ecoCoins >= 800,
      image: "/placeholder.svg",
      unlockCondition: "Need 800+ eco-coins"
    }
  ];

  const handlePurchase = (item: ShopItem) => {
    setConfirmPurchase(item);
  };

  const confirmPurchaseAction = () => {
    if (!confirmPurchase) return;
    
    if (ecoCoins >= confirmPurchase.cost && confirmPurchase.available) {
      setAnimatingBalance(true);
      setEcoCoins(prev => prev - confirmPurchase.cost);
      
      setTimeout(() => setAnimatingBalance(false), 600);
      
      toast({
        title: "Purchase Successful! 🎉",
        description: `You bought ${confirmPurchase.name} for ${confirmPurchase.cost} eco-coins!`
      });
    } else if (!confirmPurchase.available) {
      toast({
        title: "Item Not Available",
        description: "You need to meet the unlock condition first.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Insufficient Eco-Coins",
        description: `You need ${confirmPurchase.cost - ecoCoins} more eco-coins.`,
        variant: "destructive"
      });
    }
    setConfirmPurchase(null);
  };

  const handlePreview = (item: ShopItem) => {
    setPreviewItem(item);
    toast({
      title: "Preview Applied! 👀",
      description: `Previewing ${item.name} on your profile.`
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "avatar": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "theme": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "mission": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Eco-Coins Balance */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <TreePine className="h-10 w-10 text-primary animate-pulse" />
              Eco-Shop
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Use your eco-coins to unlock amazing rewards!
            </p>
            
            {/* Eco-Coins Balance Card with Progress Bar */}
            <Card className="max-w-lg mx-auto bg-gradient-to-r from-yellow-100 to-green-100 dark:from-yellow-900/20 dark:to-green-900/20 border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Coins className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className={`text-3xl font-bold text-foreground transition-all duration-600 ${
                      animatingBalance ? 'scale-110 text-primary' : ''
                    }`}>
                      {ecoCoins}
                    </p>
                    <p className="text-sm text-muted-foreground">Eco-Coins</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress to Next Tier</span>
                    <span>{ecoCoins}/{maxCoins}</span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Avatar Section */}
          {previewItem && (
            <Card className="max-w-md mx-auto mb-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview Mode
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={previewItem.image} alt={previewItem.name} />
                    <AvatarFallback>
                      <previewItem.icon className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{previewItem.name}</p>
                    <p className="text-sm text-muted-foreground">Currently previewing</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setPreviewItem(null)}
                >
                  Clear Preview
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopItems.map((item) => {
              const IconComponent = item.icon;
              const canAfford = ecoCoins >= item.cost;
              
              return (
                <Card 
                  key={item.id} 
                  className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    item.available && canAfford 
                      ? "border-primary/50 bg-card" 
                      : "opacity-75 bg-muted/50"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-2 relative">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={item.image} alt={item.name} />
                          <AvatarFallback className={`${
                            item.available && canAfford 
                              ? "bg-primary/10 text-primary" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <IconComponent className="h-10 w-10" />
                          </AvatarFallback>
                        </Avatar>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border shadow-sm"
                            >
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">
                              <strong>Unlock:</strong> {item.unlockCondition}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="secondary" className={getCategoryColor(item.category)}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    <div className="flex items-center justify-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-xl font-bold text-foreground">{item.cost}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handlePurchase(item)}
                        disabled={!item.available || !canAfford}
                        variant={canAfford && item.available ? "default" : "secondary"}
                      >
                        {!item.available 
                          ? "Locked" 
                          : !canAfford 
                            ? "Need More Coins" 
                            : "Buy Now"
                        }
                      </Button>
                      {item.category === "avatar" && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePreview(item)}
                          disabled={!item.available}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Confirmation Modal */}
          <Dialog open={!!confirmPurchase} onOpenChange={() => setConfirmPurchase(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Purchase</DialogTitle>
              </DialogHeader>
              {confirmPurchase && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={confirmPurchase.image} alt={confirmPurchase.name} />
                      <AvatarFallback>
                        <confirmPurchase.icon className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{confirmPurchase.name}</h3>
                      <p className="text-sm text-muted-foreground">{confirmPurchase.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span>Cost:</span>
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-xl font-bold">{confirmPurchase.cost}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span>Remaining Balance:</span>
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-xl font-bold">
                        {ecoCoins - confirmPurchase.cost}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setConfirmPurchase(null)}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={confirmPurchaseAction}>
                      Confirm Purchase
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Tips Section */}
          <Card className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                <Coins className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                How to Earn More Eco-Coins
              </h3>
              <p className="text-muted-foreground">
                Complete eco-missions, participate in quizzes, and climb the leaderboard to earn more eco-coins!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EcoShop;