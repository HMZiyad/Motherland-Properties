import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Building2, Image, Newspaper, Calculator, CheckCircle, Info, HeartHandshake, Briefcase, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Grouped Navigation Items (cleaner IA)
  const navItems = [
    { path: '/', label: t('nav.home'), type: 'link' },
    { path: '/projects', label: t('nav.projects'), type: 'link' },
    {
      label: 'Discover', // Group Name
      type: 'dropdown',
      path: 'discover', // virtual path for key
      children: [
        { path: '/amenities', label: t('nav.amenities'), icon: CheckCircle },
        { path: '/gallery', label: t('nav.gallery'), icon: Image },
        { path: '/news', label: t('nav.news'), icon: Newspaper },
        { path: '/emi-calculator', label: t('nav.emi'), icon: Calculator },
      ]
    },
    {
      label: 'Company', // Group Name
      type: 'dropdown',
      path: 'company', // virtual path
      children: [
        { path: '/about', label: t('nav.about'), icon: Info },
        { path: '/trust', label: t('nav.trust'), icon: HeartHandshake },
        { path: '/career', label: t('nav.career'), icon: Briefcase },
      ]
    },
    { path: '/contact', label: t('nav.contact'), icon: Phone, type: 'link' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/10 h-20 shadow-sm'
          : 'bg-transparent h-28'
          }`}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Assuming White Logo for Dark Theme */}
            <Link to="/" className="flex items-center gap-2 group relative z-50">
              <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                {/* Note: Ensure mlp2.png works on dark background, otherwise we might need a filter or different asset */}
                <img
                  src="/mlp2.png"
                  alt="Motherland Properties"
                  className="h-[4rem] w-auto object-contain drop-shadow-sm transition-all duration-500 brightness-0"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Blackbox Style */}
            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.type === 'dropdown' && setHoveredNav(item.label)}
                  onMouseLeave={() => item.type === 'dropdown' && setHoveredNav(null)}
                >
                  {item.type === 'link' ? (
                    <Link
                      to={item.path}
                      className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${location.pathname === item.path
                        ? 'text-black opacity-100 font-extrabold'
                        : 'text-black/60 hover:text-black hover:opacity-100'
                        } text-black`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black"
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 py-2 ${hoveredNav === item.label ? 'text-black opacity-100' : 'text-black/60 hover:text-black hover:opacity-100'
                        } text-black`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${hoveredNav === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  )}

                  {/* Dropdown Menu - Minimal Black */}
                  <AnimatePresence>
                    {item.type === 'dropdown' && hoveredNav === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-8 w-64"
                      >
                        <div className="bg-black border border-white/10 p-2 shadow-2xl">
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                            >
                              <span className="font-medium">{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions - Minimal */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="hidden md:flex gap-2 text-black/80 hover:text-black hover:bg-black/5 font-medium uppercase tracking-widest text-xs"
              >
                <Globe className="w-3 h-3" />
                <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
              </Button>

              <Link
                to="/nrb"
                className="hidden md:flex items-center gap-2 px-6 py-2 border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest"
              >
                {t('nav.nrb')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-black/80 hover:text-black transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Black */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-white/95 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="text-lg font-bold text-white uppercase tracking-widest">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="space-y-6">
                  {navItems.map((item) => (
                    <div key={item.label} className="space-y-3">
                      {item.type === 'link' ? (
                        <Link
                          to={item.path}
                          className="block text-2xl font-light text-white hover:text-white/60 transition-colors uppercase tracking-widest"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                            {item.label}
                          </div>
                          {item.children?.map(child => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block text-lg font-light text-white/80 hover:text-white transition-colors uppercase tracking-wider pl-4 border-l border-white/10"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
                    <Link
                      to="/nrb"
                      className="block w-full py-4 text-center border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold uppercase tracking-widest"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.nrb')}
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={toggleLanguage}
                      className="w-full gap-2 text-white/60 hover:text-white hover:bg-transparent uppercase tracking-widest"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{language === 'en' ? 'Switch to Bangla' : 'Switch to English'}</span>
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
