import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, MapPin, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSlideshow } from '@/components/home/HeroSlideshow';

// Hero Section - Semantic Style
function HeroSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = [
    "সবুজ শ্যামল এই বাংলা, আপনার স্বপ্নের ঠিকানা।", // Green verdant Bengal, your dream address.
    "শহরের কোলাহল থেকে দূরে, শান্তির এক আপন নীড়।", // Far from city noise, a peaceful own nest.
    "আগামীর প্রজন্মের জন্য, বাসমযোগ্য এক সুন্দর পৃথিবী।", // For the next generation, a livable beautiful world.
    "ঐতিহ্য আর আধুনিকতার ছোঁয়ায়, গড়ে তুলুন আপনার ভবিষ্যৎ।" // With touch of tradition and modernity, build your future.
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 6000); // Sync with slideshow interval
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-white">
      {/* Background Slideshow */}
      <HeroSlideshow currentIndex={currentIndex} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-8 text-xs font-bold uppercase tracking-[0.3em] border border-white/30 px-4 py-2 text-white/90 backdrop-blur-sm">
              Approved by RAJUK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-tight uppercase tracking-tighter drop-shadow-lg"
          >
            Motherland<br />Properties
          </motion.h1>

          <div className="h-24 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-2xl text-white/90 max-w-2xl mx-auto font-display drop-shadow-md leading-relaxed"
              >
                "{quotes[currentIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/projects"
              className="px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
            >
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 rotate-90 origin-left translate-x-3 mb-12">Discover</span>
        <div className="w-[1px] h-20 bg-white/30">
          <motion.div
            animate={{ height: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full bg-white h-full origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Stats Section - Minimal Light
function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: '500+', label: t('stats.plots') },
    { value: '300+', label: t('stats.customers') },
    { value: '14+', label: t('stats.years') },
    { value: '2', label: t('stats.projects') },
  ];

  return (
    <section className="py-32 bg-background text-foreground border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <h3 className="text-5xl sm:text-7xl font-light text-foreground mb-4 group-hover:text-primary transition-colors">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Preview Section - Grid
function ProjectsPreview() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 'nimtola',
      name: t('projects.nimtola'),
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      location: 'Savar, Dhaka',
      status: 'Available',
    },
    {
      id: 'purbachal',
      name: t('projects.purbachal'),
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      location: 'Purbachal, Dhaka',
      status: 'Limited',
    },
  ];

  return (
    <section className="py-32 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] block mb-4">Portfolio</span>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground uppercase tracking-tighter">
            Featured Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link
                to={`/projects#${project.id}`}
                className="group block relative h-full bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] font-bold px-3 py-1 uppercase tracking-widest bg-white/90 text-primary backdrop-blur-md rounded-full shadow-sm">
                      {project.status}
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Content Container */}
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold uppercase tracking-wide mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{project.location}</span>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <div className="p-2 bg-primary rounded-full text-white">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section - Minimal
function CTASection() {
  return (
    <section className="py-32 bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-bold mb-8 uppercase tracking-tighter"
          >
            Have a Vision?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-12 uppercase tracking-widest"
          >
            We can make it a reality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary/90 transition-colors"
            >
              Start Discussion
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Main Home Page
export default function Index() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <StatsSection />
      <ProjectsPreview />
      <CTASection />
    </div>
  );
}
