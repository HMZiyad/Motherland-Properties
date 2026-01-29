import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/translations';
import { Globe, Video, CreditCard, Headphones, Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Video,
    titleKey: 'nrb.virtualTour',
    description: 'Take a virtual tour of our projects from anywhere in the world via video call.',
  },
  {
    icon: CreditCard,
    titleKey: 'nrb.specialPayment',
    description: 'Convenient payment options including international bank transfers and mobile banking.',
  },
  {
    icon: Headphones,
    titleKey: 'nrb.dedicatedSupport',
    description: 'Round-the-clock support team available in your timezone.',
  },
];

const countries = [
  { name: 'USA', flag: '🇺🇸', timezone: 'EST/PST' },
  { name: 'UK', flag: '🇬🇧', timezone: 'GMT' },
  { name: 'UAE', flag: '🇦🇪', timezone: 'GST' },
  { name: 'Saudi Arabia', flag: '🇸🇦', timezone: 'AST' },
  { name: 'Malaysia', flag: '🇲🇾', timezone: 'MYT' },
  { name: 'Singapore', flag: '🇸🇬', timezone: 'SGT' },
];

export default function NRB() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-accent rounded-2xl flex items-center justify-center">
              <Globe className="w-10 h-10 text-accent-foreground" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('nrb.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('nrb.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {t(service.titleKey as TranslationKey)}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              How It Works for NRBs
            </h2>
            <p className="text-muted-foreground">Simple 4-step process from anywhere in the world</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Inquiry', desc: 'Contact us via WhatsApp, email, or phone' },
              { step: 2, title: 'Virtual Tour', desc: 'Schedule a live video tour of projects' },
              { step: 3, title: 'Booking', desc: 'Complete booking with international transfer' },
              { step: 4, title: 'Documentation', desc: 'Receive all papers via secure courier' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground -translate-y-1/2 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Serving NRBs Worldwide
            </h2>
            <p className="text-muted-foreground">We have customers from these countries and more</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow"
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium">{country.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-accent-foreground/80">
              Our NRB support team is available 24/7
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.a
              href="https://wa.me/8801712345679"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">WhatsApp</h3>
              <p className="text-sm text-accent-foreground/80">Fastest Response</p>
            </motion.a>

            <motion.a
              href="tel:+8801712345679"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
            >
              <Phone className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-sm text-accent-foreground/80">+880 1712-345679</p>
            </motion.a>

            <motion.a
              href="mailto:nrb@motherlandbd.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
            >
              <Mail className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-accent-foreground/80">nrb@motherlandbd.com</p>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link to="/contact">
                Schedule a Virtual Tour
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Can I purchase a plot without visiting Bangladesh?',
                a: 'Yes! We offer complete virtual tours and handle all documentation. Many of our NRB customers have successfully purchased plots remotely.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept international bank transfers (SWIFT), bKash, Nagad, and all major credit cards. We can also arrange payment through your local agent.',
              },
              {
                q: 'How do I receive my documents?',
                a: 'All original documents are sent via DHL/FedEx to your address. We also provide digital copies immediately after registration.',
              },
              {
                q: 'Can a family member complete the registration on my behalf?',
                a: 'Yes, with a properly notarized Power of Attorney, a family member or our authorized representative can complete the registration process.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
