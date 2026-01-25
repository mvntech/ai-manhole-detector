'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Shield, Activity, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-4">
                  Protect Your City with{' '}
                  <span className="text-primary">AI-Powered</span>{' '}
                  Manhole Detection
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                  Automatically monitor and detect dangerous manholes using existing CCTV infrastructure and real-time AI analysis powered by YOLOv8 and Google Gemini.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105">
                  Get Started →
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary transition-all bg-transparent">
                  Schedule Demo
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Badge variant="secondary" className="w-fit">Trusted by 500+ Cities</Badge>
                <Badge variant="secondary" className="w-fit">99.7% Accuracy</Badge>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="shadow-lg border-border overflow-hidden bg-card">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                {/* Dashboard mockup */}
                <div className="absolute inset-0 p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-primary/30 rounded w-32"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 bg-primary/30 rounded"></div>
                        <div className="h-6 w-6 bg-primary/30 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-12 h-12 text-primary/60" />
                      </div>
                      <div className="h-32 bg-accent/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-12 h-12 text-primary/60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-20 bg-primary/10 rounded"></div>
                      <div className="h-20 bg-primary/10 rounded"></div>
                      <div className="h-20 bg-primary/10 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Floating cards - detection alerts */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-4 right-4 bg-white dark:bg-card border border-border rounded-lg shadow-lg p-3 max-w-xs"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Alert Detected</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Damaged manhole detected at coordinates 40.7128, -74.0060</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
