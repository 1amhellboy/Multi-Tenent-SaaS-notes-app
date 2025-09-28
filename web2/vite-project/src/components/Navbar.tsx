import { useState } from 'react';
import { useLocation } from 'wouter';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logout } from "@/services/api";

interface NavbarProps {
  user: {
    id: string;
    email: string;
    role: 'admin' | 'member';
    tenantSlug: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // setLocation('/login');
    window.location.replace('/login');
  };

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //   } finally {
  //     window.location.replace("/login");
  //   }
  // };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border shadow-sm" data-testid="navbar">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground" data-testid="text-app-name">
          Notes App
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover-elevate" data-testid="button-profile">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {getInitials(user.email)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-muted-foreground" data-testid="text-tenant">
                  Tenant: {user.tenantSlug}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-role">
                  Role: {user.role}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-user-id">
                  User ID: {user.id.slice(0, 8)}...
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}