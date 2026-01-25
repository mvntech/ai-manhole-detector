'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Plus',
    price: '£2.99',
    period: 'month',
    description: 'Perfect for small municipalities',
    features: [
      'Up to 50 inspections/month',
      'Real-time alerts',
      'Basic analytics dashboard',
      'Email support',
      'Monthly reports',
    ],
    cta: 'Get Started',
    variant: 'outline',
  },
  {
    name: 'Premium',
    price: '£5.99',
    period: 'month',
    description: 'For growing cities',
    features: [
      'Unlimited inspections',
      'Real-time alerts & notifications',
      'Advanced analytics & reporting',
      'Priority support',
      'Custom integrations',
      'API access',
      '99.7% SLA guarantee',
    ],
    cta: 'Start Free Trial',
    variant: 'default',
    highlighted: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function PricingSection() {
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
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">CHOOSE YOUR PLAN</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Simple, transparent pricing
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card
                className={`border h-full flex flex-col transition-all duration-300 hover:shadow-lg ${
                  plan.highlighted
                    ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/5 md:scale-105 relative'
                    : 'border-border bg-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <Button
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="w-full mb-8"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Need a custom plan? <span className="text-primary font-semibold cursor-pointer hover:underline">Contact Sales</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
