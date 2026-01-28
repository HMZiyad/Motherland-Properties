import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, FileCheck, Award, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const documents = [
  {
    key: 'rajuk',
    icon: Shield,
    title: 'RAJUK Approval',
    description: 'All our projects are approved by RAJUK (Rajdhani Unnayan Kartripakkha)',
    status: 'Verified',
  },
  {
    key: 'rehab',
    icon: Award,
    title: 'REHAB Member',
    description: 'Registered member of Real Estate & Housing Association of Bangladesh',
    status: 'Active',
  },
  {
    key: 'environmental',
    icon: FileCheck,
    title: 'Environmental Clearance',
    description: 'Full environmental clearance from Department of Environment',
    status: 'Approved',
  },
  {
    key: 'records',
    icon: FileText,
    title: 'Land Records',
    description: 'Complete documentation including CS, RS, BS, SA records',
    status: 'Available',
  },
];

const timeline = [
  { step: 1, title: 'Booking', description: 'Initial booking with token money' },
  { step: 2, title: 'Down Payment', description: 'Pay down payment within 30 days' },
  { step: 3, title: 'Registration', description: 'Complete registration at Sub-Registry' },
  { step: 4, title: 'Handover', description: 'Receive plot possession & documents' },
];

export default function Trust() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('trust.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('trust.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <doc.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {doc.title}
                          </h3>
                          <span className="px-3 py-1 bg-plot-available/20 text-plot-available text-xs font-semibold rounded-full">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              {t('trust.timeline')}
            </h2>
            <p className="text-muted-foreground">Simple 4-step purchase process</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2" />

              <div className="grid md:grid-cols-4 gap-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                      {item.step}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {index < timeline.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-muted-foreground" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Why Trust Motherland Properties
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              '14+ Years of Experience',
              '500+ Plots Delivered',
              '100% Legal Documentation',
              'Transparent Pricing',
              'No Hidden Charges',
              'Easy EMI Options',
              'After-Sales Support',
              'RAJUK Approved Projects',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg shadow"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Samples */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Sample Documents
            </h2>
            <p className="text-muted-foreground">Click to view sample documents</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['RAJUK Approval', 'Land Survey', 'Mutation', 'Registration'].map((doc, index) => (
              <motion.div
                key={doc}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-[3/4] bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow group"
              >
                <div className="h-full flex flex-col">
                  <div className="flex-1 bg-muted flex items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-sm">{doc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
