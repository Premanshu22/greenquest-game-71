import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Download, 
  Upload as ImportIcon, 
  User, 
  Palette,
  Save,
  X,
  Camera,
  Check
} from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { useToast } from "@/hooks/use-toast";
import { User as UserType, updateCurrentUser } from "@/data/mockData";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultAvatars = [
  "🌱", "🌿", "🍃", "🌳", "🌲", "🌾"
];

const themes = [
  { id: "light", name: "Light Mode", description: "Clean and bright" },
  { id: "dark", name: "Dark Mode", description: "Easy on the eyes" },
  { id: "auto", name: "Auto", description: "Follows system preference" }
];

export const EditProfileModal = ({ open, onOpenChange }: EditProfileModalProps) => {
  const { currentUser, impersonateUser } = useDemo();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    bio: "",
    avatar: "",
    theme: "light"
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with current user data
  useEffect(() => {
    if (open && currentUser) {
      setFormData({
        name: currentUser.name || "",
        displayName: currentUser.displayName || "",
        bio: currentUser.bio || "",
        avatar: currentUser.avatar || "",
        theme: currentUser.theme || "light"
      });
      setPreviewAvatar(currentUser.avatar || "");
      setErrors({});
    }
  }, [open, currentUser]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length > 50) {
      newErrors.name = "Full name must be 50 characters or less";
    }

    if (formData.displayName && formData.displayName.length > 20) {
      newErrors.displayName = "Display name must be 20 characters or less";
    }

    if (formData.bio && formData.bio.length > 250) {
      newErrors.bio = "Bio must be 250 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 2MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewAvatar(result);
      setFormData(prev => ({ ...prev, avatar: result }));
      setIsUploading(false);
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been uploaded."
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image.",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleDefaultAvatarSelect = (emoji: string) => {
    setPreviewAvatar(emoji);
    setFormData(prev => ({ ...prev, avatar: emoji }));
    
    toast({
      title: "Avatar selected",
      description: "Default avatar has been applied."
    });
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedUser: UserType = {
      ...currentUser,
      name: formData.name,
      displayName: formData.displayName,
      bio: formData.bio,
      avatar: formData.avatar,
      theme: formData.theme as 'light' | 'dark' | 'auto'
    };

    // Update in memory and localStorage
    updateCurrentUser(updatedUser);
    impersonateUser(currentUser.id);

    // Apply theme immediately
    if (formData.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (formData.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode - follow system preference
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    toast({
      title: "✅ Profile updated",
      description: "Your profile has been saved successfully.",
    });

    onOpenChange(false);
  };

  const handleExportProfile = () => {
    const exportData = {
      ...currentUser,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecoquest-profile-${currentUser.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Profile exported",
      description: "Your profile data has been downloaded."
    });
  };

  const handleImportProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate imported data structure
        if (!importedData.name || !importedData.id) {
          throw new Error("Invalid profile data");
        }

        // Show confirmation dialog
        const confirmed = window.confirm(
          `Are you sure you want to import profile for "${importedData.name}"? This will replace your current profile data.`
        );

        if (confirmed) {
          updateCurrentUser(importedData);
          impersonateUser(importedData.id);
          
          // Update form with imported data
          setFormData({
            name: importedData.name || "",
            displayName: importedData.displayName || "",
            bio: importedData.bio || "",
            avatar: importedData.avatar || "",
            theme: importedData.theme || "light"
          });
          setPreviewAvatar(importedData.avatar || "");

          toast({
            title: "Profile imported",
            description: "Profile data has been imported successfully."
          });
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid profile file format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-labelledby="edit-profile-title"
        aria-describedby="edit-profile-description"
      >
        <DialogHeader>
          <DialogTitle id="edit-profile-title" className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Edit Profile
          </DialogTitle>
          <p id="edit-profile-description" className="text-muted-foreground">
            Update your profile information and preferences
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Profile Picture</Label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage 
                      src={previewAvatar || formData.avatar} 
                      alt="Profile preview"
                      data-bind="{{current_user.avatar}}" 
                    />
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                      {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      aria-label="Upload new profile picture"
                      className="w-full sm:w-auto"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Upload Photo"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG up to 2MB
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Or choose a default:</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {defaultAvatars.map((emoji) => (
                        <Button
                          key={emoji}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDefaultAvatarSelect(emoji)}
                          className={`h-10 w-10 p-0 text-lg ${
                            previewAvatar === emoji ? 'ring-2 ring-primary' : ''
                          }`}
                          aria-label={`Select ${emoji} avatar`}
                        >
                          {emoji}
                          {previewAvatar === emoji && (
                            <Check className="absolute h-3 w-3 text-primary top-0 right-0 bg-white rounded-full" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Label className="text-lg font-semibold">Personal Information</Label>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    maxLength={50}
                    className={errors.name ? 'border-destructive' : ''}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    data-bind="{{current_user.name}}"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    placeholder="How others see you"
                    maxLength={20}
                    className={errors.displayName ? 'border-destructive' : ''}
                    aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                  />
                  {errors.displayName && (
                    <p id="displayName-error" className="text-sm text-destructive" role="alert">
                      {errors.displayName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  maxLength={250}
                  rows={3}
                  className={errors.bio ? 'border-destructive' : ''}
                  aria-describedby={errors.bio ? 'bio-error bio-count' : 'bio-count'}
                  data-bind="{{current_user.bio}}"
                />
                <div className="flex justify-between items-center">
                  <div>
                    {errors.bio && (
                      <p id="bio-error" className="text-sm text-destructive" role="alert">
                        {errors.bio}
                      </p>
                    )}
                  </div>
                  <p id="bio-count" className="text-xs text-muted-foreground">
                    {formData.bio.length}/250
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Preferences */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Theme Preference
                </Label>
                
                <RadioGroup
                  value={formData.theme}
                  onValueChange={(value) => handleInputChange('theme', value)}
                  className="space-y-3"
                  data-bind="{{current_user.theme}}"
                >
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/20 transition-colors">
                      <RadioGroupItem value={theme.id} id={theme.id} />
                      <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-sm text-muted-foreground">{theme.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Data Management</Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportProfile}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => importInputRef.current?.click()}
                  className="flex-1"
                >
                  <ImportIcon className="h-4 w-4 mr-2" />
                  Import Profile
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Export your profile data as JSON or import from a previously exported file.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUploading}
            className="sm:flex-1 btn-eco-glow"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
          aria-label="Upload profile picture"
        />
        <input
          type="file"
          ref={importInputRef}
          onChange={handleImportProfile}
          accept=".json"
          className="hidden"
          aria-label="Import profile data"
        />
      </DialogContent>
    </Dialog>
  );
};