import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/projects', label: t('nav.projects') },
    { path: '/emi-calculator', label: t('nav.emi') },
    { path: '/amenities', label: t('nav.amenities') },
    { path: '/trust', label: t('nav.trust') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/nrb', label: t('nav.nrb') },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-black/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="block">
              <img
                src="/mlp2.png"
                alt="Motherland Properties"
                className="h-16 w-auto object-contain brightness-0"
              />
            </Link>
            <p className="text-black/60 text-xs leading-relaxed max-w-sm uppercase tracking-wide">
              Building dreams and creating communities since 2010. Your trusted partner for premium residential plots in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-8 uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-black/60 hover:text-black transition-colors text-xs uppercase tracking-wider block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-8 uppercase tracking-[0.2em]">{t('nav.contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-black/40 shrink-0 mt-0.5" />
                <span className="text-black/60 text-xs uppercase tracking-wide">
                  House #12, Road #5, Dhanmondi<br />
                  Dhaka-1205, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-black/40 shrink-0" />
                <a href="tel:+8801712345678" className="text-black/60 text-xs hover:text-black transition-colors uppercase tracking-wide">
                  +880 1712-345678
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-black/40 shrink-0" />
                <a href="mailto:info@motherlandbd.com" className="text-black/60 text-xs hover:text-black transition-colors uppercase tracking-wide">
                  info@motherlandbd.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-bold text-sm mb-8 uppercase tracking-[0.2em]">{t('footer.followUs')}</h4>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="p-6 border border-black/10 bg-black/5 backdrop-blur-sm">
              <p className="text-xs font-bold text-black/40 mb-2 uppercase tracking-widest">NRB Hotline</p>
              <a href="tel:+8801712345679" className="text-black font-light text-xl hover:text-black/60 transition-colors">
                +880 1712-345679
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-black/40 text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Motherland Properties Ltd. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-8 text-[10px] text-black/40 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
