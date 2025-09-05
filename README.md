# 🌱 EcoQuest - Environmental Education Platform

A gamified learning management system focused on environmental education, built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Gamified Learning**: Interactive quizzes, achievements, and progress tracking
- **Role-Based Access**: Student, Teacher, and Admin dashboards
- **Demo Mode**: Full demo experience with user impersonation
- **Eco-Missions**: Real-world environmental challenges
- **Eco-Shop**: Virtual rewards and customization items
- **Impact Tracking**: Global environmental impact visualization
- **Community Forum**: Discussion and collaboration
- **Achievements Gallery**: Badge collection and progress celebration

## 🚀 Quick Start

### Demo Mode Instructions

1. **Enable Demo Mode**: Toggle the "Demo Mode" switch in the header
2. **Impersonate Users**: Use the dropdown to switch between:
   - **Student** (Alex Chen): Level 12, 7-day streak, multiple badges
   - **Teacher** (Ms. Rodriguez): Level 25, educator privileges  
   - **Admin** (Dr. Green): Level 50, full platform access

3. **Presentation Mode**: Toggle to hide admin controls and show guided demo hints

### User Impersonation Guide

#### As Student:
- View personalized dashboard with XP progress and streak
- Take quizzes and earn badges
- Browse and participate in eco-missions
- Shop for avatar customizations and power-ups
- Track personal environmental impact

#### As Teacher:
- Access teacher dashboard with class management
- Monitor student progress and engagement
- Create and manage missions
- View class leaderboards and analytics

#### As Admin:
- Full platform administration access
- User management and moderation
- System analytics and reporting
- Platform configuration

## 🛠️ Development

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

### Key Files

- **Demo Context**: \`src/contexts/DemoContext.tsx\` - Manages demo mode and user impersonation
- **Mock Data**: \`src/data/mockData.ts\` - All demo data and user profiles
- **Demo Data JSON**: \`public/demo-data.json\` - Exportable demo dataset

### Mock Data Structure

The demo includes comprehensive mock data:
- **Users**: 3 complete user profiles (student, teacher, admin)
- **Missions**: 3 eco-missions with different statuses and submissions
- **Shop Items**: 8 diverse shop items across categories
- **Badges**: 12 achievement badges with rarity levels
- **Impact Data**: Global environmental impact statistics
- **Quizzes**: Sample quiz data with completion tracking

## 🔧 Backend Integration

For production deployment, replace mock data with API calls:

1. **API Endpoints**: See \`/integration\` page for complete documentation
2. **Data Binding**: Replace \`{{placeholder}}\` variables with API responses
3. **Authentication**: Implement JWT token management
4. **Persistence**: Replace localStorage with database storage

Key integration points:
- \`GET /api/user/:id\` → User profile data
- \`GET /api/missions\` → Missions list
- \`POST /api/missions/:id/submit\` → Mission submissions
- \`GET /api/shop\` → Shop items
- \`POST /api/shop/buy\` → Purchase transactions

## 📱 Responsive Design

- **Desktop**: Full navigation and feature access
- **Mobile**: Collapsible navigation with slide-over menu
- **Tablet**: Optimized layouts for medium screens

## 🎨 Customization

### Themes
- Light, Dark, and Auto themes supported
- User-selectable theme preferences
- Consistent design system with CSS custom properties

### Avatars & Assets
- Default avatar gallery (10 sample avatars)
- Badge icon collection (12 themed badges)
- Customizable user profiles with bio and display names

## 📊 Analytics & Tracking

The platform tracks various metrics in demo mode:
- User engagement and streak tracking
- Quiz completion rates and scores
- Mission participation and success rates
- Badge acquisition and progression
- Environmental impact calculations

## 🌍 Environmental Focus

EcoQuest promotes environmental awareness through:
- Climate change education
- Recycling and sustainability challenges
- Biodiversity conservation missions
- Energy efficiency tracking
- Water conservation awareness
- Real-world impact visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with demo mode
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check the \`/integration\` page for API documentation
- Review mock data structures in \`src/data/mockData.ts\`
- Test all features using demo mode user impersonation
- Ensure responsive design across all device sizes

---

Built with 💚 for our planet's future through education and engagement.
