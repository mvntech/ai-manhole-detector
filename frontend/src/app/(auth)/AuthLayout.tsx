'use client';

import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    leftContent: React.ReactNode;
}

export default function AuthLayout({ children, leftContent }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden text-primary-foreground">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("/auth-bg.webp")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/50 z-0" />
                <div className="relative z-10 flex flex-col h-full justify-between p-12 w-full">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image src="/icon-192.png" alt="AI Manhole Detector Logo" width={32} height={32} className='object-contain' />
                        </div>
                        <span className="text-2xl font-bold">AI Manhole Detector</span>
                    </div>
                    {leftContent}
                </div>
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-background">
                <div className="w-full w-full">
                    <div className="flex lg:hidden items-center gap-2 mb-6 justify-center">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Image src="/icon-192.png" alt="AI Manhole Detector Logo" width={32} height={32} className='object-contain' />
                        </div>
                        <span className="text-xl font-bold text-foreground">AI Manhole Detector</span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
