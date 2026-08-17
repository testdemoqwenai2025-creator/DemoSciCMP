'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/lib/auth-store';
import { 
  FlaskConical, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Github,
  Chrome,
  ExternalLink
} from 'lucide-react';

export default function LoginModal() {
  const {
    showLoginModal,
    setShowLoginModal,
    login,
    isLoading,
    isGithubLoading,
    isAuthenticated,
    initiateGithubLogin,
  } = useAuthStore();

  // Form state - use a key to reset instead of useEffect
  const [formKey, setFormKey] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  // Reset form when modal opens (using key pattern)
  const handleOpenChange = (open: boolean) => {
    setShowLoginModal(open);
    if (open) {
      setFormKey(prev => prev + 1); // This will reset all child state
    }
  };

  // Close modal if authenticated
  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, showLoginModal, setShowLoginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && !name) {
      setError('Please enter your name');
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      if (isSignUp) {
        setError('Account creation failed. Please try again.');
      } else {
        setError('Invalid email or password. Try: demo@scicmp.com / demo123');
      }
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@scicmp.com');
    setPassword('demo123');
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-primary/90 via-primary to-blue-600 px-8 pt-8 pb-12">
          <DialogHeader className="text-center text-white">
            <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <FlaskConical className="w-8 h-8" />
              Welcome to SciCMP
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-2">
              {isSignUp 
                ? 'Create your account to get started' 
                : 'Sign in to access your workspace'
              }
            </DialogDescription>
          </DialogHeader>
          
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
        </div>

        {/* Form Content - Key resets form state when changed */}
        <div className="px-8 pb-8 -mt-6">
          <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Dr. Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-12"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 gradient-bg text-white border-0 font-semibold text-base hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => {
                  setError('Google Sign-In coming soon!');
                }}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 relative"
                onClick={async () => {
                  try {
                    setError('');
                    await initiateGithubLogin();
                  } catch (err) {
                    setError('GitHub login failed. Please try again.');
                  }
                }}
                disabled={isGithubLoading}
              >
                {isGithubLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Github className="mr-2 h-5 w-5" />
                )}
                {isGithubLoading ? 'Connecting...' : 'GitHub'}
                {!isGithubLoading && (
                  <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                )}
              </Button>
            </div>

            {/* Demo Login Hint */}
            {!isSignUp && (
              <div 
                className="p-3 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors"
                onClick={handleDemoLogin}
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-primary">Quick Demo Access</p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      Click to fill demo credentials (demo@scicmp.com)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Toggle Sign In/Up */}
            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>

            {/* Terms */}
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to SciCMP's{' '}
              <a href="#" className="underline hover:text-foreground">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
