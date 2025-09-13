import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Award, 
  Search, 
  Edit, 
  Trash2, 
  UserPlus, 
  RefreshCw,
  TrendingUp,
  MessageCircle,
  Flag,
  Eye,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RouteGuard } from '@/components/RouteGuard';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  joinedDate: string;
  status: 'active' | 'disabled';
}

interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  reported: boolean;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);

  // Mock data
  const mockUsers: User[] = [
    { id: '1', email: 'alice@school.edu', name: 'Alice Cooper', role: 'student', joinedDate: '2024-01-15', status: 'active' },
    { id: '2', email: 'bob@school.edu', name: 'Bob Wilson', role: 'teacher', joinedDate: '2024-01-10', status: 'active' },
    { id: '3', email: 'charlie@school.edu', name: 'Charlie Brown', role: 'student', joinedDate: '2024-02-01', status: 'disabled' },
    { id: '4', email: 'diana@school.edu', name: 'Diana Prince', role: 'teacher', joinedDate: '2024-01-20', status: 'active' },
    { id: '5', email: 'eve@school.edu', name: 'Eve Adams', role: 'admin', joinedDate: '2024-01-05', status: 'active' },
  ];

  const mockForumThreads: ForumThread[] = [
    { id: '1', title: 'Best practices for water conservation', author: 'Alice Cooper', replies: 12, reported: false },
    { id: '2', title: 'Solar panel efficiency discussion', author: 'Bob Wilson', replies: 8, reported: true },
    { id: '3', title: 'Community garden project ideas', author: 'Diana Prince', replies: 15, reported: false },
  ];

  // Load data from localStorage or use mock data
  useEffect(() => {
    const savedData = localStorage.getItem('ecoquest_demo');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUsers(parsed.users || mockUsers);
        setForumThreads(parsed.forumThreads || mockForumThreads);
      } catch {
        setUsers(mockUsers);
        setForumThreads(mockForumThreads);
      }
    } else {
      setUsers(mockUsers);
      setForumThreads(mockForumThreads);
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage
  const saveToLocalStorage = (updatedUsers: User[], updatedThreads: ForumThread[]) => {
    const data = {
      users: updatedUsers,
      forumThreads: updatedThreads,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('ecoquest_demo', JSON.stringify(data));
  };

  // Filter users
  useEffect(() => {
    let filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const handleEditUser = (user: User) => {
    console.log('PATCH /api/admin/users/' + user.id, user);
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers, forumThreads);
    setEditingUser(null);
    toast({
      title: 'User Updated',
      description: `${user.name}'s profile has been updated.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    console.log('DELETE /api/admin/users/' + userId);
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers, forumThreads);
    toast({
      title: 'User Deleted',
      description: 'User has been removed from the system.',
      variant: 'destructive',
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    console.log('POST /api/admin/users/toggle-status', { userId });
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' as 'active' | 'disabled' }
        : u
    );
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers, forumThreads);
    toast({
      title: 'Status Updated',
      description: 'User status has been changed.',
    });
  };

  const handleAddDemoTeacher = () => {
    console.log('POST /api/admin/users', { role: 'teacher' });
    const newTeacher: User = {
      id: Date.now().toString(),
      email: `teacher${Date.now()}@demo.edu`,
      name: `Demo Teacher ${users.length + 1}`,
      role: 'teacher',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    const updatedUsers = [...users, newTeacher];
    setUsers(updatedUsers);
    saveToLocalStorage(updatedUsers, forumThreads);
    toast({
      title: 'Demo Teacher Added',
      description: 'New teacher account created.',
    });
  };

  const handleResetDemoData = () => {
    setUsers(mockUsers);
    setForumThreads(mockForumThreads);
    localStorage.removeItem('ecoquest_demo');
    toast({
      title: 'Demo Data Reset',
      description: 'All demo data has been restored to defaults.',
    });
  };

  const handleToggleReport = (threadId: string) => {
    console.log('POST /api/admin/forum/toggle-report', { threadId });
    const updatedThreads = forumThreads.map(t => 
      t.id === threadId ? { ...t, reported: !t.reported } : t
    );
    setForumThreads(updatedThreads);
    saveToLocalStorage(users, updatedThreads);
  };

  const handleRemoveThread = (threadId: string) => {
    console.log('DELETE /api/admin/forum/threads/' + threadId);
    const updatedThreads = forumThreads.filter(t => t.id !== threadId);
    setForumThreads(updatedThreads);
    saveToLocalStorage(users, updatedThreads);
    toast({
      title: 'Thread Removed',
      description: 'Forum thread has been removed.',
      variant: 'destructive',
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'teacher': return 'secondary';
      case 'student': return 'default';
      default: return 'outline';
    }
  };

  const stats = {
    totalUsers: users.length,
    totalStudents: users.filter(u => u.role === 'student').length,
    totalTeachers: users.filter(u => u.role === 'teacher').length,
    totalQuizzes: 156,
    totalMissions: 24,
    totalBadges: 48
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <RouteGuard allowedRoles={['admin']} currentPath="Admin Dashboard">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, content, and platform settings</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Administrator Access
          </Badge>
        </div>

        {/* Platform Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-xl font-bold">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <p className="text-xl font-bold">{stats.totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                  <p className="text-xl font-bold">{stats.totalQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Missions</p>
                  <p className="text-xl font-bold">{stats.totalMissions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-xl font-bold">{stats.totalBadges}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="forum">Forum Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* User Management Controls */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="teacher">Teachers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* User Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinedDate}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingUser(user)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>
                                      Make changes to user account details.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingUser && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                          id="name"
                                          value={editingUser.name}
                                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                          id="email"
                                          value={editingUser.email}
                                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="role">Role</Label>
                                        <Select 
                                          value={editingUser.role} 
                                          onValueChange={(value: 'student' | 'teacher' | 'admin') => 
                                            setEditingUser({...editingUser, role: value})
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <Button 
                                        onClick={() => handleEditUser(editingUser)}
                                        className="w-full"
                                      >
                                        Save Changes
                                      </Button>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === 'active' ? 'Disable' : 'Enable'}
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={handleAddDemoTeacher} className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add Demo Teacher
                  </Button>
                  <Button variant="outline" onClick={() => {
                    console.log('POST /api/admin/bulk-invite', { role: 'student', count: 10 });
                    toast({ title: 'Bulk Invite Sent', description: '10 student invites sent (mock).' });
                  }}>
                    Bulk Invite Students (Mock)
                  </Button>
                  <Button variant="destructive" onClick={handleResetDemoData}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Demo Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forum Moderation</CardTitle>
                <CardDescription>Monitor and moderate community discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thread Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forumThreads.map((thread) => (
                      <TableRow key={thread.id}>
                        <TableCell className="font-medium">{thread.title}</TableCell>
                        <TableCell>{thread.author}</TableCell>
                        <TableCell>{thread.replies}</TableCell>
                        <TableCell>
                          {thread.reported ? (
                            <Badge variant="destructive">
                              <Flag className="h-3 w-3 mr-1" />
                              Reported
                            </Badge>
                          ) : (
                            <Badge variant="default">Normal</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleReport(thread.id)}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveThread(thread.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Platform usage and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Coming Soon - Advanced analytics including user engagement, quiz completion rates, 
                    and platform usage statistics will be available here.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RouteGuard>
  );
};

export default AdminDashboard;