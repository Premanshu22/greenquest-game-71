import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  Database, 
  Link as LinkIcon, 
  FileText, 
  Settings, 
  Webhook,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Integration = () => {
  const mockDataStructures = {
    user: {
      id: "string",
      name: "string", 
      displayName: "string?",
      bio: "string?",
      role: "'student' | 'teacher' | 'admin'",
      avatar: "string (base64 or emoji)",
      level: "number",
      xp: "number",
      xpToNextLevel: "number", 
      coins: "number",
      streak: "number",
      badges: "string[] (badge IDs)",
      courses: "string[]",
      classId: "string?",
      theme: "'light' | 'dark' | 'auto'"
    },
    mission: {
      id: "string",
      title: "string",
      description: "string", 
      rewardXP: "number",
      rewardCoins: "number",
      badgeId: "string",
      status: "'current' | 'completed' | 'locked'",
      difficulty: "'Easy' | 'Medium' | 'Hard'",
      deadline: "string (ISO date)",
      category: "'recycling' | 'energy' | 'water' | 'biodiversity'",
      submissions: "MissionSubmission[]"
    },
    badge: {
      id: "string",
      name: "string",
      icon: "string (emoji)",
      category: "'achievement' | 'participation' | 'mastery' | 'special'",
      description: "string",
      unlockCondition: "string",
      rarity: "'common' | 'rare' | 'epic' | 'legendary'",
      xpReward: "number"
    },
    shopItem: {
      id: "string",
      title: "string",
      type: "'avatar' | 'badge' | 'theme' | 'accessory'",
      cost: "number",
      image: "string (URL or base64)",
      stock: "number",
      description: "string",
      unlockCondition: "string",
      category: "'customization' | 'power-ups' | 'exclusive'"
    }
  };

  const apiEndpoints = [
    {
      method: "GET",
      path: "/api/user/:id",
      description: "Get user profile data",
      response: "User object",
      frontendBinding: "{{current_user.*}}"
    },
    {
      method: "PUT", 
      path: "/api/user/:id",
      description: "Update user profile",
      payload: "Partial<User>",
      frontendBinding: "EditProfileModal form data"
    },
    {
      method: "GET",
      path: "/api/missions",
      description: "Get all missions for user",
      response: "Mission[]",
      frontendBinding: "{{missions}} in EcoMissions page"
    },
    {
      method: "POST",
      path: "/api/missions/:id/submit",
      description: "Submit mission proof",
      payload: "{ user_id: string, note: string, proof_url: string }",
      frontendBinding: "Mission submission form"
    },
    {
      method: "GET",
      path: "/api/shop",
      description: "Get shop items",
      response: "ShopItem[]", 
      frontendBinding: "{{shopItems}} in EcoShop page"
    },
    {
      method: "POST",
      path: "/api/shop/buy",
      description: "Purchase shop item",
      payload: "{ user_id: string, item_id: string }",
      frontendBinding: "Shop purchase action"
    },
    {
      method: "GET",
      path: "/api/badges",
      description: "Get all available badges",
      response: "Badge[]",
      frontendBinding: "{{badges}} in Achievements page"
    },
    {
      method: "GET",
      path: "/api/leaderboard",
      description: "Get leaderboard data",
      response: "User[] (sorted by XP/level)",
      frontendBinding: "Leaderboard component"
    },
    {
      method: "GET",
      path: "/api/quizzes",
      description: "Get available quizzes",
      response: "Quiz[]",
      frontendBinding: "{{quizzes}} in Quiz page"
    },
    {
      method: "POST",
      path: "/api/quizzes/:id/submit",
      description: "Submit quiz answers",
      payload: "{ user_id: string, answers: Answer[] }",
      frontendBinding: "Quiz submission form"
    }
  ];

  const frontendPlaceholders = [
    { placeholder: "{{current_user.name}}", description: "User's display name", location: "Header, Profile, Cards" },
    { placeholder: "{{current_user.avatar}}", description: "User's avatar (emoji/image)", location: "Profile, Dashboard, Navigation" },
    { placeholder: "{{current_user.level}}", description: "User's current level", location: "Level badges, Progress indicators" },
    { placeholder: "{{current_user.xp}}", description: "User's experience points", location: "Progress bars, Stats" },
    { placeholder: "{{current_user.coins}}", description: "User's eco-coins", location: "Shop, Rewards, Header" },
    { placeholder: "{{current_user.streak}}", description: "User's daily streak", location: "Dashboard, Streak cards" },
    { placeholder: "{{current_user.badges}}", description: "Array of user's badge IDs", location: "Profile, Achievements" },
    { placeholder: "{{missions}}", description: "Array of missions", location: "EcoMissions page, Dashboard cards" },
    { placeholder: "{{shopItems}}", description: "Array of shop items", location: "EcoShop page, Purchase modals" },
    { placeholder: "{{badges}}", description: "Array of all badges", location: "Achievements page, Badge modals" },
    { placeholder: "{{impact}}", description: "Global impact data", location: "Impact Tracker page" },
    { placeholder: "{{quizzes}}", description: "Array of quizzes", location: "Quiz page, Dashboard CTA" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Integration Documentation</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete guide for connecting EcoQuest frontend to your backend API. 
          This documentation covers data structures, API endpoints, and frontend binding points.
        </p>
      </div>

      <Tabs defaultValue="data-structures" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
          <TabsTrigger value="api-endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="frontend-bindings">Frontend Bindings</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="data-structures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Mock Data Structures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These are the TypeScript interfaces used throughout the frontend. 
                Your API should return data in these exact formats.
              </p>
              
              <div className="grid gap-6">
                {Object.entries(mockDataStructures).map(([name, structure]) => (
                  <Card key={name} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-lg capitalize flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        {name} Interface
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                          <code>
{`interface ${name.charAt(0).toUpperCase() + name.slice(1)} {
${Object.entries(structure).map(([key, type]) => `  ${key}: ${type};`).join('\n')}
}`}
                          </code>
                        </pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                API Endpoints to Implement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These RESTful endpoints need to be implemented on your backend to replace the mock data.
              </p>
              
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            endpoint.method === 'GET' ? 'default' :
                            endpoint.method === 'POST' ? 'destructive' :
                            endpoint.method === 'PUT' ? 'secondary' : 'outline'
                          }>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint.path}</code>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {endpoint.response && (
                          <div>
                            <span className="font-medium text-green-600">Response:</span>
                            <code className="ml-2 text-xs bg-green-50 px-2 py-1 rounded">{endpoint.response}</code>
                          </div>
                        )}
                        {endpoint.payload && (
                          <div>
                            <span className="font-medium text-blue-600">Payload:</span>
                            <code className="ml-2 text-xs bg-blue-50 px-2 py-1 rounded">{endpoint.payload}</code>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t">
                        <span className="text-xs text-muted-foreground">Frontend Binding: </span>
                        <code className="text-xs bg-yellow-50 px-2 py-1 rounded">{endpoint.frontendBinding}</code>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frontend-bindings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Frontend Data Binding Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These placeholders in the frontend code show where API data should be injected.
                Replace mock data calls with actual API calls at these locations.
              </p>
              
              <div className="space-y-4">
                {frontendPlaceholders.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <code className="text-sm bg-primary/10 px-2 py-1 rounded font-mono">
                        {item.placeholder}
                      </code>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>Used in:</strong> {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Implementation Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Step 1: Replace Mock Data Context
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Replace <code>src/contexts/DemoContext.tsx</code> with API calls:
                    </p>
                    <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// Instead of mockData imports
import { mockUsers, mockMissions } from '@/data/mockData';

// Use API calls
const fetchCurrentUser = async (userId: string) => {
  const response = await fetch(\`/api/user/\${userId}\`);
  return response.json();
};`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Step 2: Update localStorage Keys
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Replace localStorage with API persistence:
                    </p>
                    <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// Current localStorage key
localStorage.getItem('ecoquest_currentUser');

// Replace with API call + JWT token storage
const token = localStorage.getItem('auth_token');
const user = await authenticatedFetch('/api/user/me', token);`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Step 3: Authentication Flow
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Important</p>
                        <p className="text-sm text-yellow-700">
                          The current demo mode bypasses authentication. Implement proper login/logout 
                          flows and JWT token management when connecting to your backend.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Step 4: Error Handling
                  </h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Add proper error handling for API calls:
                    </p>
                    <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`try {
  const response = await fetch('/api/missions');
  if (!response.ok) throw new Error('Failed to fetch missions');
  const missions = await response.json();
  setMissions(missions);
} catch (error) {
  toast.error('Failed to load missions. Please try again.');
  console.error('API Error:', error);
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integration;