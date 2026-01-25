'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Bell, Camera, Shield, BarChart3, Lock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Real-Time Detection',
    description: 'Instantly identify dangerous or missing manhole covers with AI-powered CCTV analysis running 24/7.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Automated alerts notify your team immediately when hazards are detected for rapid response.',
  },
  {
    icon: Camera,
    title: 'Seamless Integration',
    description: 'Works with existing CCTV infrastructure - no expensive hardware upgrades required.',
  },
  {
    icon: BarChart3,
    title: '99.7% Accuracy',
    description: 'Industry-leading detection powered by YOLOv8 and validated across thousands of inspections.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, compliance with municipal regulations, and data privacy guarantees.',
  },
  {
    icon: Lock,
    title: '24/7 Monitoring',
    description: 'Continuous surveillance and analysis without human intervention - always watching.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">PLATFORM FEATURES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Experience that grows with your scale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive tools designed specifically for municipal infrastructure safety and hazard management.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
