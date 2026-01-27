'use client';

import React from "react"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from "../AuthLayout";
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "react-hot-toast"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post("/auth/register", {
                email,
                username: username || email.split("@")[0],
                password,
                full_name: fullName,
                role: "OPERATOR",
            });
            toast.success("Account created successfully! Please sign in.");
            router.push("/login");
        } catch (error: any) {
            console.error("Registration error:", error);
            const message = error.response?.data?.detail || "Registration failed";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const leftContent = (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">Join 500+ Cities</h1>
            <p className="text-lg text-primary-foreground/90">
                Get started with AI-powered infrastructure monitoring today.
            </p>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground font-semibold">
                        1
                    </div>
                    <div>
                        <p className="font-medium text-primary-foreground">Create Account</p>
                        <p className="text-sm text-primary-foreground/70">Quick 2-minute setup</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground font-semibold">
                        2
                    </div>
                    <div>
                        <p className="font-medium text-primary-foreground">Connect Cameras</p>
                        <p className="text-sm text-primary-foreground/70">Integrate your CCTV system</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground font-semibold">
                        3
                    </div>
                    <div>
                        <p className="font-medium text-primary-foreground">Start Monitoring</p>
                        <p className="text-sm text-primary-foreground/70">AI starts detecting immediately</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout leftContent={<>{leftContent}</>}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Request Access</CardTitle>
                    <CardDescription>Fill out the form below for enterprise account approval</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username (Optional)</Label>
                                <Input
                                    id="username"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@municipality.gov"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-start space-x-2 pt-4">
                            <Checkbox id="terms" required />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
                        <AlertCircle className="h-3 w-3" />
                        <span>Access requests are reviewed within 24-48 hours. Approval notifications are sent via email.</span>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}