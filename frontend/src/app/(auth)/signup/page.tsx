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

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
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
                            <h3 className="text-sm font-medium text-foreground">Organization Information</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input id="firstName" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input id="lastName" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Work Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@municipality.gov"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organization">Organization Name *</Label>
                                <Input
                                    id="organization"
                                    placeholder="City of New York - Dept. of Transportation"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Your Role *</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">System Administrator</SelectItem>
                                            <SelectItem value="manager">Infrastructure Manager</SelectItem>
                                            <SelectItem value="engineer">City Engineer</SelectItem>
                                            <SelectItem value="director">Department Director</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <h3 className="text-sm font-medium text-foreground">Deployment Information</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cameras">Number of Cameras</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1-10 cameras</SelectItem>
                                            <SelectItem value="11-50">11-50 cameras</SelectItem>
                                            <SelectItem value="51-100">51-100 cameras</SelectItem>
                                            <SelectItem value="100+">100+ cameras</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timeline">Expected Deployment</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select timeline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                                            <SelectItem value="month">Within 1 month</SelectItem>
                                            <SelectItem value="quarter">Within 3 months</SelectItem>
                                            <SelectItem value="evaluating">Still evaluating</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
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