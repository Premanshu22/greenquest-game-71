// Mock data for EcoQuest demo experience
export interface User {
  id: string;
  name: string;
  displayName?: string;
  bio?: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  badges: string[];
  courses: string[];
  classId?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXP: number;
  rewardCoins: number;
  badgeId: string;
  status: 'current' | 'completed' | 'locked';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  deadline: string;
  category: 'recycling' | 'energy' | 'water' | 'biodiversity';
  submissions: MissionSubmission[];
}

export interface MissionSubmission {
  userId: string;
  thumbnail: string;
  note: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ShopItem {
  id: string;
  title: string;
  type: 'avatar' | 'badge' | 'theme' | 'accessory';
  cost: number;
  image: string;
  stock: number;
  description: string;
  unlockCondition: string;
  category: 'customization' | 'power-ups' | 'exclusive';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  category: 'achievement' | 'participation' | 'mastery' | 'special';
  description: string;
  unlockCondition: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

export interface ImpactData {
  treesSaved: number;
  waterSavedLiters: number;
  co2ReducedKg: number;
  energySavedKwh: number;
  topClasses: Array<{
    name: string;
    score: number;
    students: number;
    city: string;
  }>;
  globalRegions: Array<{
    name: string;
    progress: number;
    color: string;
  }>;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'climate' | 'recycling' | 'biodiversity' | 'energy';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  timeLimit: number;
  xpReward: number;
  completed: boolean;
  score?: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'student1',
    name: 'Alex Chen',
    displayName: 'EcoWarrior',
    bio: 'Passionate about sustainable living and renewable energy. Level 12 environmental champion working towards a greener future! 🌱',
    role: 'student',
    avatar: '🌱',
    level: 12,
    xp: 2450,
    xpToNextLevel: 550,
    coins: 1250,
    streak: 7,
    badges: ['eco-warrior', 'quiz-master', 'tree-hugger', 'water-saver'],
    courses: ['climate-101', 'recycling-basics', 'biodiversity-fun'],
    classId: 'class-7a',
    theme: 'light'
  },
  {
    id: 'teacher1',
    name: 'Ms. Rodriguez',
    displayName: 'Prof. Wilson',
    bio: 'Environmental Science Professor with 15 years of experience in climate research and education. Helping students discover the wonders of our planet.',
    role: 'teacher',
    avatar: '👩‍🏫',
    level: 25,
    xp: 8750,
    xpToNextLevel: 1250,
    coins: 3200,
    streak: 15,
    badges: ['educator', 'mentor', 'eco-champion', 'community-builder'],
    courses: ['all-courses'],
    theme: 'auto'
  },
  {
    id: 'admin1',
    name: 'Dr. Green',
    displayName: 'GreenThumb',
    bio: 'Sustainability advocate and platform administrator. Leading the global effort to create environmentally conscious digital citizens.',
    role: 'admin',
    avatar: '🌿',
    level: 50,
    xp: 25000,
    xpToNextLevel: 5000,
    coins: 10000,
    streak: 30,
    badges: ['system-admin', 'eco-pioneer', 'platform-creator', 'sustainability-guru'],
    courses: ['all-courses'],
    theme: 'dark'
  }
];

// Current User (will be switched via impersonation)
export let currentUser: User = mockUsers[0];

// Mock Missions
export const mockMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'Plastic-Free Week Challenge',
    description: 'Document your plastic-free alternatives for one week. Share photos and tips with the community.',
    rewardXP: 150,
    rewardCoins: 75,
    badgeId: 'plastic-warrior',
    status: 'current',
    difficulty: 'Medium',
    deadline: '2024-01-15',
    category: 'recycling',
    submissions: [
      {
        userId: 'student2',
        thumbnail: '/placeholder.svg?height=200&width=200',
        note: 'Used glass containers instead of plastic bags for lunch!',
        date: '2024-01-08',
        status: 'approved'
      }
    ]
  },
  {
    id: 'mission2',
    title: 'Energy Audit Hero',
    description: 'Complete an energy audit of your home and implement 3 energy-saving measures.',
    rewardXP: 200,
    rewardCoins: 100,
    badgeId: 'energy-saver',
    status: 'completed',
    difficulty: 'Hard',
    deadline: '2023-12-20',
    category: 'energy',
    submissions: []
  },
  {
    id: 'mission3',
    title: 'Biodiversity Explorer',
    description: 'Create a nature journal documenting 10 different species in your local area.',
    rewardXP: 120,
    rewardCoins: 60,
    badgeId: 'nature-explorer',
    status: 'locked',
    difficulty: 'Easy',
    deadline: '2024-02-01',
    category: 'biodiversity',
    submissions: []
  }
];

// Mock Shop Items
export const mockShopItems: ShopItem[] = [
  {
    id: 'avatar1',
    title: 'Eco Warrior Avatar',
    type: 'avatar',
    cost: 500,
    image: '/placeholder.svg?height=200&width=200',
    stock: 1,
    description: 'Transform into an eco-warrior with this heroic avatar design.',
    unlockCondition: 'Complete 5 missions',
    category: 'customization'
  },
  {
    id: 'badge1',
    title: 'Golden Leaf Badge',
    type: 'badge',
    cost: 300,
    image: '/placeholder.svg?height=100&width=100',
    stock: 1,
    description: 'A prestigious golden leaf badge for eco champions.',
    unlockCondition: 'Reach Level 10',
    category: 'exclusive'
  },
  {
    id: 'theme1',
    title: 'Ocean Theme',
    type: 'theme',
    cost: 750,
    image: '/placeholder.svg?height=200&width=200',
    stock: 1,
    description: 'Beautiful ocean-themed interface with wave animations.',
    unlockCondition: 'Complete Water Conservation course',
    category: 'customization'
  },
  {
    id: 'powerup1',
    title: '2x XP Boost',
    type: 'accessory',
    cost: 150,
    image: '/placeholder.svg?height=100&width=100',
    stock: 5,
    description: 'Double your XP gains for the next 24 hours.',
    unlockCondition: 'Available to all users',
    category: 'power-ups'
  },
  {
    id: 'avatar2',
    title: 'Forest Guardian',
    type: 'avatar',
    cost: 600,
    image: '/placeholder.svg?height=200&width=200',
    stock: 1,
    description: 'Become a mystical forest guardian protecting nature.',
    unlockCondition: 'Plant 50 virtual trees',
    category: 'customization'
  },
  {
    id: 'accessory1',
    title: 'Solar Panel Hat',
    type: 'accessory',
    cost: 200,
    image: '/placeholder.svg?height=100&width=100',
    stock: 3,
    description: 'A futuristic hat with mini solar panels.',
    unlockCondition: 'Complete Energy course',
    category: 'customization'
  },
  {
    id: 'theme2',
    title: 'Desert Sunset Theme',
    type: 'theme',
    cost: 800,
    image: '/placeholder.svg?height=200&width=200',
    stock: 1,
    description: 'Warm desert colors with animated sunset effects.',
    unlockCondition: 'Reach Level 20',
    category: 'exclusive'
  },
  {
    id: 'powerup2',
    title: 'Coin Magnet',
    type: 'accessory',
    cost: 180,
    image: '/placeholder.svg?height=100&width=100',
    stock: 10,
    description: 'Attract 50% more coins for 1 hour.',
    unlockCondition: 'Available to all users',
    category: 'power-ups'
  }
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    icon: '🌿',
    category: 'achievement',
    description: 'Complete your first environmental mission',
    unlockCondition: 'Complete any mission',
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    icon: '🧠',
    category: 'mastery',
    description: 'Achieve 90% or higher on 10 quizzes',
    unlockCondition: 'Score 90%+ on 10 quizzes',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'tree-hugger',
    name: 'Tree Hugger',
    icon: '🌳',
    category: 'achievement',
    description: 'Plant 25 virtual trees through eco-actions',
    unlockCondition: 'Plant 25 virtual trees',
    rarity: 'common',
    xpReward: 100
  },
  {
    id: 'water-saver',
    name: 'Water Saver',
    icon: '💧',
    category: 'achievement',
    description: 'Save 1000 liters through conservation efforts',
    unlockCondition: 'Document water-saving activities',
    rarity: 'rare',
    xpReward: 200
  },
  {
    id: 'plastic-warrior',
    name: 'Plastic Warrior',
    icon: '♻️',
    category: 'special',
    description: 'Complete plastic reduction challenges',
    unlockCondition: 'Complete plastic-free missions',
    rarity: 'epic',
    xpReward: 300
  },
  {
    id: 'energy-saver',
    name: 'Energy Saver',
    icon: '⚡',
    category: 'mastery',
    description: 'Reduce energy consumption by 20%',
    unlockCondition: 'Complete energy audit',
    rarity: 'rare',
    xpReward: 250
  },
  {
    id: 'nature-explorer',
    name: 'Nature Explorer',
    icon: '🦋',
    category: 'participation',
    description: 'Document biodiversity in your area',
    unlockCondition: 'Complete nature journal',
    rarity: 'common',
    xpReward: 75
  },
  {
    id: 'educator',
    name: 'Educator',
    icon: '👩‍🏫',
    category: 'special',
    description: 'Mentor and guide student learning',
    unlockCondition: 'Teacher role',
    rarity: 'legendary',
    xpReward: 500
  },
  {
    id: 'mentor',
    name: 'Mentor',
    icon: '🎓',
    category: 'achievement',
    description: 'Help 10 students complete missions',
    unlockCondition: 'Assist student mission completion',
    rarity: 'epic',
    xpReward: 400
  },
  {
    id: 'eco-champion',
    name: 'Eco Champion',
    icon: '🏆',
    category: 'mastery',
    description: 'Reach the top of class leaderboard',
    unlockCondition: 'Rank #1 in class',
    rarity: 'legendary',
    xpReward: 1000
  },
  {
    id: 'community-builder',
    name: 'Community Builder',
    icon: '🤝',
    category: 'participation',
    description: 'Active participant in forums and discussions',
    unlockCondition: 'Post 50 helpful comments',
    rarity: 'rare',
    xpReward: 300
  },
  {
    id: 'sustainability-guru',
    name: 'Sustainability Guru',
    icon: '🌍',
    category: 'mastery',
    description: 'Master of all environmental topics',
    unlockCondition: 'Complete all courses with 95%+',
    rarity: 'legendary',
    xpReward: 2000
  }
];

// Mock Impact Data
export const mockImpactData: ImpactData = {
  treesSaved: 15847,
  waterSavedLiters: 2456890,
  co2ReducedKg: 89234,
  energySavedKwh: 145678,
  topClasses: [
    { name: 'Greenwood High School', score: 8750, students: 245, city: 'Portland' },
    { name: 'EcoTech Academy', score: 8420, students: 198, city: 'San Francisco' },
    { name: 'Nature Valley School', score: 7890, students: 167, city: 'Boulder' },
    { name: 'Sustainable Learning Center', score: 7650, students: 203, city: 'Seattle' },
    { name: 'Green Future Institute', score: 7320, students: 189, city: 'Austin' }
  ],
  globalRegions: [
    { name: 'North America', progress: 78, color: 'bg-green-500' },
    { name: 'Europe', progress: 85, color: 'bg-blue-500' },
    { name: 'Asia-Pacific', progress: 62, color: 'bg-purple-500' },
    { name: 'South America', progress: 71, color: 'bg-yellow-500' },
    { name: 'Africa', progress: 45, color: 'bg-red-500' },
    { name: 'Oceania', progress: 89, color: 'bg-teal-500' }
  ]
};

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz1',
    title: 'Climate Change Basics',
    category: 'climate',
    difficulty: 'Easy',
    questions: 10,
    timeLimit: 300,
    xpReward: 50,
    completed: true,
    score: 85
  },
  {
    id: 'quiz2',
    title: 'Advanced Recycling Techniques',
    category: 'recycling',
    difficulty: 'Hard',
    questions: 20,
    timeLimit: 600,
    xpReward: 150,
    completed: true,
    score: 92
  },
  {
    id: 'quiz3',
    title: 'Renewable Energy Systems',
    category: 'energy',
    difficulty: 'Medium',
    questions: 15,
    timeLimit: 450,
    xpReward: 100,
    completed: false
  },
  {
    id: 'quiz4',
    title: 'Biodiversity Conservation',
    category: 'biodiversity',
    difficulty: 'Medium',
    questions: 12,
    timeLimit: 360,
    xpReward: 80,
    completed: false
  }
];

// User management functions
let currentUserId = "student1";

export const getCurrentUser = (): User => {
  // Try to get user from localStorage first
  const stored = localStorage.getItem('ecoquest_currentUser');
  if (stored) {
    try {
      const parsedUser = JSON.parse(stored);
      // Update the mock users array to maintain consistency
      const userIndex = mockUsers.findIndex(u => u.id === parsedUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = parsedUser;
      }
      return parsedUser;
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
  }
  return mockUsers.find(user => user.id === currentUserId) || mockUsers[0];
};

export const updateCurrentUser = (updatedUser: User): void => {
  // Update in memory
  const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = updatedUser;
  }
  
  // Persist to localStorage
  localStorage.setItem('ecoquest_currentUser', JSON.stringify(updatedUser));
  currentUserId = updatedUser.id;
};

export const switchUser = (userId: string): User | null => {
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    currentUserId = userId;
    // Clear localStorage when switching users in demo mode
    localStorage.removeItem('ecoquest_currentUser');
    return user;
  }
  return null;
};

export const updateUserCoins = (amount: number): void => {
  currentUser.coins += amount;
};

export const updateUserXP = (amount: number): void => {
  currentUser.xp += amount;
  // Check for level up
  while (currentUser.xp >= currentUser.xpToNextLevel) {
    currentUser.xp -= currentUser.xpToNextLevel;
    currentUser.level++;
    currentUser.xpToNextLevel = Math.floor(currentUser.xpToNextLevel * 1.2);
  }
};

export const addUserBadge = (badgeId: string): void => {
  if (!currentUser.badges.includes(badgeId)) {
    currentUser.badges.push(badgeId);
  }
};