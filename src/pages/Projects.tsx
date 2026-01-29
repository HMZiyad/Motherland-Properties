import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/translations';
import { MapPin, Filter, X, ChevronDown, Hand, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type PlotStatus = 'available' | 'booked' | 'sold';
type PlotType = 'commercial' | 'residential' | 'special';

// Plot Interface
interface Plot {
  id: string;
  block: string;
  type: PlotType;
  status: PlotStatus;
  size: number;
  roadWidth: number;
  corner: boolean;
  price: number;
}

// Generate Data (Same logic as before, just kept for brevity in plan)
const generatePlots = (): Plot[] => {
  const plots: Plot[] = [];

  // BLOCK A
  for (let i = 1; i <= 100; i++) {
    let type: PlotType = 'residential';
    let size = 2;
    let roadWidth = 30;
    if (i > 80) { type = 'commercial'; size = 1; }
    else if (i <= 20) { size = 4; }
    else { size = i % 3 === 0 ? 4 : 2; }

    plots.push({
      id: `A${i}`, block: 'A', type,
      status: i % 6 === 0 ? 'booked' : i % 9 === 0 ? 'sold' : 'available',
      size, roadWidth, corner: i % 10 === 1,
      price: type === 'commercial' ? 50000000 : size * 1200000
    });
  }

  // BLOCK B
  for (let i = 1; i <= 80; i++) {
    if (i >= 30 && i <= 35) continue;
    plots.push({
      id: `B${i}`, block: 'B', type: 'residential',
      status: i % 5 === 0 ? 'booked' : i % 8 === 0 ? 'sold' : 'available',
      size: i % 2 === 0 ? 4 : 2, roadWidth: 25, corner: i % 8 === 1,
      price: 2 * 1200000
    });
  }

  // BLOCK C
  for (let i = 1; i <= 80; i++) {
    let type: PlotType = 'residential';
    let size = 2;
    if (i <= 15) { type = 'special'; size = 5; }
    plots.push({
      id: `C${i}`, block: 'C', type,
      status: i % 4 === 0 ? 'booked' : i % 10 === 0 ? 'sold' : 'available',
      size, roadWidth: 25, corner: i % 6 === 1,
      price: type === 'special' ? 8000000 : size * 1200000
    });
  }
  return plots;
};

const plotsData = generatePlots();

interface FilterState {
  status: string;
  minSize: number;
  maxSize: number;
  roadWidth: number | 'all';
  corner: 'all' | 'yes' | 'no';
  minPrice: number;
  maxPrice: number;
}

// Mobile-friendly Filter Panel (Bottom Sheet style on mobile, Sidebar on desktop)
function FilterPanel({ filters, setFilters, onClose }: { filters: FilterState; setFilters: (f: FilterState) => void; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        className="w-full sm:w-80 bg-card border-l h-full shadow-2xl overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-foreground">{t('projects.filterTitle')}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'available', 'booked', 'sold'].map(s => (
                <Badge
                  key={s}
                  variant={filters.status === s ? 'default' : 'outline'}
                  className="cursor-pointer capitalize"
                  onClick={() => setFilters({ ...filters, status: s })}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={() => setFilters({ status: 'all', minSize: 2, maxSize: 10, roadWidth: 'all', corner: 'all', minPrice: 0, maxPrice: 100000000 })}>
            Reset Filters
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// The Map Component itself
function PlotMap({ plots, onPlotClick }: { plots: Plot[]; onPlotClick: (plot: Plot) => void }) {
  const plotsA = plots.filter(p => p.block === 'A');
  const plotsB = plots.filter(p => p.block === 'B');
  const plotsC = plots.filter(p => p.block === 'C');

  const getPlotStyle = (plot: Plot) => {
    let bg = '#fde047';
    if (plot.size === 1) bg = '#3b82f6';
    if (plot.size === 4) bg = '#4ade80';
    if (plot.size === 5) bg = '#f9a8d4';
    return { backgroundColor: bg };
  };

  const PlotButton = ({ plot }: { plot: Plot }) => (
    <motion.button
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onPlotClick(plot)}
      className="relative w-full aspect-[1.3/1] border-[0.5px] border-slate-600/30 text-[8px] sm:text-[10px] font-bold text-slate-800 flex items-center justify-center shadow-sm overflow-hidden"
      style={getPlotStyle(plot)}
    >
      <span className="z-10 bg-white/40 px-0.5 rounded backdrop-blur-[0px]">{plot.id.replace(plot.block, '')}</span>
      {plot.status === 'booked' && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-30 z-0 bg-slate-500" />}
      {plot.status === 'sold' && (
        <div className="absolute inset-0 bg-red-600/40 z-20 flex items-center justify-center">
          <X className="w-full h-full text-white p-1" />
        </div>
      )}
    </motion.button>
  );

  return (
    <div className="relative w-full border rounded-xl overflow-hidden bg-slate-50 shadow-inner group">
      {/* ScrollArea only active on Desktop for the wide map feel */}
      <div className="w-full md:overflow-x-auto md:h-auto">
        <div className="w-full md:min-w-[1000px] p-4 md:p-8 md:pb-16 relative bg-[#f8f9fa] select-none">

          {/* Visual Background Elements - Hidden on Mobile to avoid layout breaking */}
          <div className="hidden md:block absolute top-0 left-20 right-20 h-40 bg-blue-200/50 rounded-b-[50%] border-b-4 border-blue-300 pointer-events-none" />
          <div className="hidden md:block absolute top-8 left-8 w-24 h-24 text-slate-800 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md"><path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#fff" stroke="currentColor" strokeWidth="2" /><path d="M50 0 L50 50 L0 50 Z" fill="currentColor" /><text x="44" y="12" fontSize="14" fontWeight="bold">N</text></svg>
          </div>

          {/* Blocks Render - Stack on Mobile, Row on Desktop */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center md:items-start relative z-10 pt-4 md:pt-20">

            {/* BLOCK A */}
            <div className="flex-1 flex flex-col gap-1 w-full max-w-sm md:w-72">
              <div className="text-center bg-primary text-primary-foreground font-bold py-1 text-sm rounded-t-sm">BLOCK - A</div>
              <div className="bg-green-100 border-2 border-green-300 h-24 flex items-center justify-center mb-1 rounded-sm relative overflow-hidden">
                <span className="text-green-800 font-bold uppercase tracking-widest text-lg">Park</span>
              </div>
              <div className="grid grid-cols-6 gap-0.5 p-1 border border-slate-300 bg-slate-100">
                {plotsA.slice(0, 48).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
              <div className="h-8 bg-[#e5e5e0] flex items-center justify-center border-y border-slate-300 my-1"><span className="text-[10px] font-bold text-slate-500 uppercase">Road</span></div>
              <div className="grid grid-cols-6 gap-0.5 p-1 border border-slate-300 bg-slate-100">
                {plotsA.slice(48, 80).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
              <div className="grid grid-cols-6 gap-0.5 p-1 border border-blue-200 bg-blue-50 mt-1">
                {plotsA.slice(80).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
            </div>

            {/* BLOCK B */}
            <div className="flex-1 flex flex-col gap-1 md:pt-12 w-full max-w-sm md:w-64">
              <div className="text-center bg-primary text-primary-foreground font-bold py-1 text-sm rounded-t-sm">BLOCK - B</div>
              <div className="relative">
                <div className="grid grid-cols-5 gap-0.5 p-1 border border-slate-300 bg-slate-100">
                  {plotsB.map(p => <PlotButton key={p.id} plot={p} />)}
                </div>
              </div>
            </div>

            {/* BLOCK C */}
            <div className="flex-1 flex flex-col gap-1 md:pt-8 w-full max-w-sm md:w-64">
              <div className="text-center bg-primary text-primary-foreground font-bold py-1 text-sm rounded-t-sm">BLOCK - C</div>
              <div className="bg-pink-100 border-2 border-pink-300 h-24 flex items-center justify-center mb-1 md:rounded-tr-[3rem]">
                <span className="text-pink-800 font-bold uppercase tracking-widest text-center">Apts</span>
              </div>
              <div className="grid grid-cols-5 gap-0.5 p-1 border border-slate-300 bg-slate-100">
                {plotsC.map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Modal
function PlotDetailModal({ plot, onClose }: { plot: Plot | null; onClose: () => void }) {
  const { t } = useLanguage();
  if (!plot) return null;

  // Dummy Data Generators
  const bookingMoney = Math.round(plot.price * 0.1);
  const installment = Math.round((plot.price - bookingMoney) / 60);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          className="bg-card border w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-primary/5 p-6 border-b">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Plot {plot.id}
              </h3>
              <Badge variant={plot.status === 'available' ? 'default' : 'secondary'} className="uppercase">
                {plot.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">Block {plot.block} • {plot.type === 'commercial' ? 'Commercial' : 'Residential'} Zone</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Plot Size</p>
                <p className="text-lg font-bold text-foreground">{plot.size === 1 ? 'Commercial' : `${plot.size} Katha`}</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Facing Road</p>
                <p className="text-lg font-bold text-foreground">{plot.roadWidth}' Wide</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Plot Price</p>
                <p className="text-lg font-bold text-primary">৳ {(plot.price / 100000).toFixed(1)} Lakh</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Booking Money</p>
                <p className="text-lg font-bold text-foreground">৳ {(bookingMoney / 100000).toFixed(1)} Lakh</p>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <h4 className="font-display font-semibold text-lg">Payment Plan</h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Up to 60 Installments</span>
                <span className="font-bold">~ ৳ {(installment).toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Or One-time Payment</span>
                <span className="font-bold text-green-600">10% Discount</span>
              </div>
            </div>

            <Button className="w-full text-lg py-6 shadow-lg shadow-primary/20" size="lg" disabled={plot.status !== 'available'}>
              {plot.status === 'available' ? 'Book This Plot Now' : 'Currently Unavailable'}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              * Prices are subject to change. Contact us for final quotation.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden mb-8">
      <div className="h-48 bg-gray-200 relative">
        <img src={project.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <h2 className="text-3xl font-bold text-white">{project.name}</h2>
        </div>
      </div>
      <CardContent className="p-6">
        <p>{project.description}</p>
      </CardContent>
    </Card>
  )
}

export default function Projects() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedProject, setSelectedProject] = useState<'nimtola' | 'purbachal'>('nimtola');
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    minSize: 2,
    maxSize: 10,
    roadWidth: 'all',
    corner: 'all',
    minPrice: 0,
    maxPrice: 100000000
  });

  const projects = {
    nimtola: {
      name: t('projects.nimtola'),
      location: 'Savar, Dhaka',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      description: 'A modern smart city project with all civic amenities.'
    },
    purbachal: {
      name: t('projects.purbachal'),
      location: 'Purbachal, Dhaka',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      description: 'Premium lake-view plots with excellent connectivity.'
    }
  };

  const filteredPlots = plotsData.filter((plot) => {
    if (filters.status !== 'all' && plot.status !== filters.status) return false;
    if (plot.size < filters.minSize || plot.size > filters.maxSize) return false;
    if (filters.roadWidth !== 'all' && plot.roadWidth !== filters.roadWidth) return false;
    if (filters.corner === 'yes' && !plot.corner) return false;
    if (filters.corner === 'no' && plot.corner) return false;
    if (plot.price < filters.minPrice || plot.price > filters.maxPrice) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {(['nimtola', 'purbachal'] as const).map((p) => (
            <Button
              key={p}
              variant={selectedProject === p ? 'default' : 'outline'}
              onClick={() => setSelectedProject(p)}
            >
              {projects[p].name}
            </Button>
          ))}
        </div>

        <ProjectCard project={projects[selectedProject]} />

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl font-bold text-foreground">Site Plan</h2>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        <PlotMap plots={filteredPlots} onPlotClick={setSelectedPlot} />
      </div>

      {showFilters && <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />}
      {selectedPlot && <PlotDetailModal plot={selectedPlot} onClose={() => setSelectedPlot(null)} />}
    </div>
  );
}
