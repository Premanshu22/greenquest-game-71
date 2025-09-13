import React, { ReactNode } from 'react';
import { useDemo } from '@/contexts/DemoContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles: Array<'guest' | 'student' | 'teacher' | 'admin'>;
  currentPath: string;
}

export const RouteGuard = ({ children, allowedRoles, currentPath }: RouteGuardProps) => {
  const { isDemoMode, currentRole } = useDemo();

  if (!isDemoMode || allowedRoles.includes(currentRole)) {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto p-6">
      <Alert className="max-w-2xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            Access to {currentPath} is available for {allowedRoles.join(', ')} only. 
            Switch role in Demo Mode to view this page.
          </span>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </AlertDescription>
      </Alert>
    </div>
  );
};