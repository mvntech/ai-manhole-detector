'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const stats = [
  { number: '500+', label: 'Cities & Districts Monitoring' },
  { number: '180K+', label: 'Daily Inspections Processed' },
  { number: '99.9%', label: 'System Uptime Reliability' },
]

export function StatsSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">WHY CITIES CHOOSE US</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Why they prefer AI Manhole Detector
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border bg-card p-8 text-center h-full">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-border bg-gradient-to-br from-card to-accent/10 p-8 h-full">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">Instant Hazard Detection</h3>
              <p className="text-muted-foreground">
                Real-time alerts allow maintenance teams to respond immediately to open or damaged manholes, preventing accidents.
              </p>
            </Card>
          </motion.div>

          {/* Card 2 - Graph */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="border-border bg-card p-8 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Maintenance Savings</p>
                  <div className="text-3xl font-bold text-primary">$1,876,580</div>
                </div>
                <select className="bg-transparent text-xs border border-border rounded px-2 py-1 text-foreground">
                  <option>6 months</option>
                  <option>1 year</option>
                  <option>All time</option>
                </select>
              </div>

              {/* Simple line chart visualization */}
              <div className="h-40 relative">
                <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="oklch(0.6231 0.1880 259.8145)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="oklch(0.6231 0.1880 259.8145)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="oklch(0.6231 0.1880 259.8145)"
                    strokeWidth="2"
                    points="0,120 40,90 80,100 120,70 160,80 200,50 240,60 280,40 320,50 360,30 400,20"
                  />
                  <polygon
                    fill="url(#areaGradient)"
                    points="0,120 40,90 80,100 120,70 160,80 200,50 240,60 280,40 320,50 360,30 400,20 400,160 0,160"
                  />
                </svg>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>24/7 Monitoring • Transparent Reporting • Enterprise-grade Security</p>
        </motion.div>
      </div>
    </section>
  )
}
