import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, TreePine, Palette, Target, Crown, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "avatar" | "theme" | "mission";
  icon: any;
  available: boolean;
}

const EcoShop = () => {
  const { toast } = useToast();
  const [ecoCoins, setEcoCoins] = useState(1250);

  const shopItems: ShopItem[] = [
    {
      id: "forest-avatar",
      name: "Forest Guardian Avatar",
      description: "Become a protector of the forest with this nature-themed avatar",
      cost: 500,
      category: "avatar",
      icon: TreePine,
      available: true
    },
    {
      id: "ocean-theme",
      name: "Ocean Blue Theme",
      description: "Transform your interface with calming ocean colors",
      cost: 300,
      category: "theme", 
      icon: Palette,
      available: true
    },
    {
      id: "bonus-mission",
      name: "Clean Beach Mission",
      description: "Unlock an exclusive beach cleanup challenge",
      cost: 200,
      category: "mission",
      icon: Target,
      available: true
    },
    {
      id: "premium-avatar",
      name: "Eco-Warrior Crown",
      description: "Show your eco-leadership with this golden crown",
      cost: 1000,
      category: "avatar",
      icon: Crown,
      available: true
    },
    {
      id: "sunrise-theme",
      name: "Sunrise Theme",
      description: "Start each day with warm, inspiring colors",
      cost: 400,
      category: "theme",
      icon: Star,
      available: true
    },
    {
      id: "rare-mission",
      name: "Rare Species Mission",
      description: "Help document endangered species in your area",
      cost: 800,
      category: "mission",
      icon: Sparkles,
      available: ecoCoins >= 800
    }
  ];

  const handlePurchase = (item: ShopItem) => {
    if (ecoCoins >= item.cost && item.available) {
      setEcoCoins(prev => prev - item.cost);
      toast({
        title: "Purchase Successful! 🎉",
        description: `You bought ${item.name} for ${item.cost} eco-coins!`
      });
    } else if (!item.available) {
      toast({
        title: "Item Not Available",
        description: "You need more eco-coins to unlock this item.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Insufficient Eco-Coins",
        description: `You need ${item.cost - ecoCoins} more eco-coins.`,
        variant: "destructive"
      });
    }
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
          
          {/* Eco-Coins Balance Card */}
          <Card className="max-w-md mx-auto bg-gradient-to-r from-yellow-100 to-green-100 dark:from-yellow-900/20 dark:to-green-900/20 border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3">
                <Coins className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Your Balance</p>
                  <p className="text-3xl font-bold text-foreground">{ecoCoins}</p>
                  <p className="text-sm text-muted-foreground">Eco-Coins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <div className="flex justify-center mb-2">
                    <div className={`p-3 rounded-full ${
                      item.available && canAfford 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <IconComponent className="h-8 w-8" />
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
                  
                  <Button 
                    className="w-full"
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
                </CardContent>
              </Card>
            );
          })}
        </div>

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
  );
};

export default EcoShop;