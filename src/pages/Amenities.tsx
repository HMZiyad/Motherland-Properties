import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Church, Trees, Heart, ShoppingBag, Bus, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const amenitiesData = [
  {
    key: 'schools',
    icon: GraduationCap,
    items: ['International School', 'Government College', 'Medical University', 'Technical Institute'],
    distance: '0.5-3 km',
  },
  {
    key: 'mosques',
    icon: Church,
    items: ['Central Mosque', 'Community Prayer Hall', 'Eidgah Ground', 'Religious Center'],
    distance: '0.2-1 km',
  },
  {
    key: 'parks',
    icon: Trees,
    items: ['Lake View Park', 'Children Playground', 'Botanical Garden', 'Walking Track'],
    distance: 'Within project',
  },
  {
    key: 'healthcare',
    icon: Heart,
    items: ['24/7 Hospital', 'Pharmacy', 'Diagnostic Center', 'Emergency Services'],
    distance: '1-5 km',
  },
  {
    key: 'markets',
    icon: ShoppingBag,
    items: ['Shopping Mall', 'Super Shop', 'Fresh Market', 'Food Court'],
    distance: '0.5-2 km',
  },
  {
    key: 'transport',
    icon: Bus,
    items: ['Bus Terminal', 'Metro Station', 'Expressway Access', 'Airport Link'],
    distance: '2-10 km',
  },
];

export default function Amenities() {
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
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t('amenities.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('amenities.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenitiesData.map((amenity, index) => (
              <motion.div
                key={amenity.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <amenity.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {t(`amenities.${amenity.key}` as any)}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-accent mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{amenity.distance}</span>
                    </div>
                    <ul className="space-y-2">
                      {amenity.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Location Map</h2>
            <p className="text-muted-foreground">Find us easily on the map</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.4!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </motion.div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Connectivity</h2>
            <p className="text-muted-foreground">Well connected to major destinations</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dhaka Airport', time: '45 min' },
              { name: 'Uttara', time: '30 min' },
              { name: 'Gulshan', time: '40 min' },
              { name: 'Dhanmondi', time: '35 min' },
            ].map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl shadow-lg"
              >
                <p className="text-3xl font-bold text-primary mb-2">{destination.time}</p>
                <p className="text-muted-foreground">{destination.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
