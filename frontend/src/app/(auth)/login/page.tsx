'use client';

import React from "react"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from "../AuthLayout";
import { Building, Check, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    const leftContent = (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p className="text-lg text-primary-foreground/90">
                Monitor your city's infrastructure with AI-powered precision.
            </p>
            <div className="space-y-4 text-primary-foreground/80">
                <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <span>Trusted by 500+ municipalities</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <span>99.7% detection accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <span>Real-time alerts & monitoring</span>
                </div>
            </div>
        </div>
    );

    const footerContent = (
        <div className="text-sm text-primary-foreground/70">
            <p>"This system has prevented over 10,000 potential accidents."</p>
            <p className="mt-1 font-medium">- NYC Infrastructure Dept.</p>
        </div>
    );

    return (
        <AuthLayout leftContent={<>{leftContent}</>}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full bg-transparent" type="button">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Continue with Government ID
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" type="button">
                            <Building className="mr-2 h-4 w-4" />
                            Continue with Organization SSO
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@municipality.gov"
                                className="border-border"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="border-border"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                                Keep me signed in for 30 days
                            </label>
                        </div>

                        <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            Request access
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                        <Lock className="h-3 w-3" />
                        <span>Enterprise-grade security & encryption</span>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
