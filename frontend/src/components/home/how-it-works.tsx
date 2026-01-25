'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    number: '1',
    title: 'Connect Infrastructure',
    description: 'Link your existing CCTV network to our platform via API or secure upload, requiring no new hardware.',
  },
  {
    number: '2',
    title: 'Automated Analysis',
    description: 'Our computer vision models continuously scan footage to identify missing covers, cracks, and anomalies.',
  },
  {
    number: '3',
    title: 'Actionable Insights',
    description: 'Receive prioritized alerts and generate maintenance work orders automatically when hazards are found.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-background via-card/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Maximize public safety with intelligent infrastructure monitoring
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg"
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-lg text-center"
          >
            <p className="text-muted-foreground leading-relaxed">
              Each integration is streamlined for rapid deployment. Most cities are up and running within 24 hours of connecting their infrastructure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
