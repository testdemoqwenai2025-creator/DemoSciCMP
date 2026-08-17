'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/lib/auth-store';
import {
  User,
  Settings,
  LogOut,
  FlaskConical,
  Crown,
  Building2,
  ChevronDown,
  Shield,
} from 'lucide-react';

export default function UserMenu() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3 h-3 text-red-500" />;
      case 'researcher':
        return <FlaskConical className="w-3 h-3 text-primary" />;
      default:
        return <User className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium">
            <Building2 className="w-3 h-3" />
            Enterprise
          </span>
        );
      case 'pro':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Crown className="w-3 h-3" />
            Pro
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            Free
          </span>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 px-3 gap-2 rounded-full hover:bg-accent"
        >
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-sm font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium leading-tight max-w-[120px] truncate">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground max-w-[120px] truncate">
              {user.email}
            </span>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />

          {/* Online Status Indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 p-2">
        {/* User Info Header */}
        <div className="p-3 rounded-lg bg-muted/50 mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/30">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-base font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                {getRoleBadge(user.role)}
              </div>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                {getPlanBadge(user.plan)}
                {user.institution && (
                  <span className="text-xs text-muted-foreground truncate">
                    {user.institution}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <User className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Profile</span>
            <span className="text-xs text-muted-foreground">View and edit your profile</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Settings</span>
            <span className="text-xs text-muted-foreground">Account preferences</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-3 py-2.5">
          <FlaskConical className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">My Workspaces</span>
            <span className="text-xs text-muted-foreground">Access your projects</span>
          </div>
        </DropdownMenuItem>

        {/* Plan Upgrade (for free users) */}
        {user.plan === 'free' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10">
              <Crown className="w-4 h-4 text-primary" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-primary">Upgrade to Pro</span>
                <span className="text-xs text-muted-foreground">Unlock all features</span>
              </div>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem 
          onClick={logout}
          className="cursor-pointer gap-3 py-2.5 text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </DropdownMenuItem>

        {/* Session Info */}
        <div className="pt-2 px-1">
          <p className="text-xs text-muted-foreground text-center">
            Member since {user.joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
