'use client'

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { useSocket } from "@/hooks/use-socket"
import { Sidebar } from '@/components/shared/sidebar'
import { Header } from '@/components/shared/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  useSocket();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
