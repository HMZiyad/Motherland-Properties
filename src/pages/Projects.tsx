import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Filter, X, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

// Generate Data
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

// Filter Panel - Minimal
function FilterPanel({ filters, setFilters, onClose }: { filters: FilterState; setFilters: (f: FilterState) => void; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        className="w-full sm:w-80 bg-white h-full shadow-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold uppercase tracking-widest">{t('projects.filterTitle')}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
        </div>

        {/* Status */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-widest mb-4 block">Status</label>
          <div className="flex flex-wrap gap-2">
            {['all', 'available', 'booked', 'sold'].map(s => (
              <Badge
                key={s}
                variant={filters.status === s ? 'default' : 'outline'}
                className="cursor-pointer capitalize rounded-none"
                onClick={() => setFilters({ ...filters, status: s })}
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-black text-white hover:bg-gray-800 uppercase tracking-widest text-xs py-6"
          onClick={() => {
            setFilters({ status: 'all', minSize: 2, maxSize: 10, roadWidth: 'all', corner: 'all', minPrice: 0, maxPrice: 100000000 });
            onClose();
          }}
        >
          Reset Filters
        </Button>
      </motion.div>
    </div>
  );
}

// The Map Component - Monochrome Technical
function PlotMap({ plots, onPlotClick }: { plots: Plot[]; onPlotClick: (plot: Plot) => void }) {
  const plotsA = plots.filter(p => p.block === 'A');
  const plotsB = plots.filter(p => p.block === 'B');
  const plotsC = plots.filter(p => p.block === 'C');

  const getPlotStyle = (plot: Plot) => {
    // Monochrome Logic
    // Available: White with Black Border
    // Booked: Gray Hatch
    // Sold: Solid Black

    if (plot.status === 'sold') return { backgroundColor: '#000000', color: '#ffffff' };
    if (plot.status === 'booked') return { backgroundColor: '#a3a3a3' }; // Gray
    return { backgroundColor: '#ffffff' };
  };

  const PlotButton = ({ plot }: { plot: Plot }) => (
    <motion.button
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onPlotClick(plot)}
      className={`relative w-full aspect-[1.3/1] border-[0.5px] border-black/20 text-[8px] sm:text-[10px] font-bold flex items-center justify-center overflow-hidden transition-colors ${plot.status === 'available' ? 'hover:bg-black hover:text-white' : ''
        }`}
      style={getPlotStyle(plot)}
    >
      <span className="z-10">{plot.id.replace(plot.block, '')}</span>
    </motion.button>
  );

  return (
    <div className="relative w-full border border-black/10 overflow-hidden bg-white">
      {/* ScrollArea */}
      <div className="w-full md:overflow-x-auto md:h-auto">
        <div className="w-full md:min-w-[1000px] p-8 md:pb-16 relative bg-white select-none">

          {/* Blocks Render */}
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 pt-4 md:pt-12">

            {/* BLOCK A */}
            <div className="flex-1 flex flex-col gap-1 w-full max-w-sm">
              <div className="text-center font-bold py-2 text-xs uppercase tracking-[0.2em] border border-black">BLOCK - A</div>
              <div className="bg-gray-100 border border-gray-300 h-24 flex items-center justify-center mb-1">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-lg">Central Park</span>
              </div>
              <div className="grid grid-cols-6 gap-0.5 p-1 bg-gray-50 border border-gray-200">
                {plotsA.slice(0, 48).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
              <div className="h-8 flex items-center justify-center border-y border-gray-200 my-1"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Road</span></div>
              <div className="grid grid-cols-6 gap-0.5 p-1 bg-gray-50 border border-gray-200">
                {plotsA.slice(48, 80).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
              <div className="grid grid-cols-6 gap-0.5 p-1 bg-gray-50 border border-gray-200 mt-1">
                {plotsA.slice(80).map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
            </div>

            {/* BLOCK B */}
            <div className="flex-1 flex flex-col gap-1 w-full max-w-sm md:pt-12">
              <div className="text-center font-bold py-2 text-xs uppercase tracking-[0.2em] border border-black">BLOCK - B</div>
              <div className="grid grid-cols-5 gap-0.5 p-1 bg-gray-50 border border-gray-200">
                {plotsB.map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
            </div>

            {/* BLOCK C */}
            <div className="flex-1 flex flex-col gap-1 w-full max-w-sm md:pt-8">
              <div className="text-center font-bold py-2 text-xs uppercase tracking-[0.2em] border border-black">BLOCK - C</div>
              <div className="grid grid-cols-5 gap-0.5 p-1 bg-gray-50 border border-gray-200">
                {plotsC.map(p => <PlotButton key={p.id} plot={p} />)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Modal - Minimalist
function PlotDetailModal({ plot, onClose }: { plot: Plot | null; onClose: () => void }) {
  if (!plot) return null;

  const bookingMoney = Math.round(plot.price * 0.1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white w-full max-w-lg shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-white text-black p-8 border-b border-black/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-bold uppercase tracking-tighter">
                Plot {plot.id}
              </h3>
              <Badge variant="outline" className="border-black text-black uppercase tracking-widest rounded-none">
                {plot.status}
              </Badge>
            </div>
            <p className="text-black/60 text-xs uppercase tracking-widest">Block {plot.block} • {plot.type} Zone</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Size</p>
                <p className="text-xl font-bold text-black">{plot.size} Katha</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Road</p>
                <p className="text-xl font-bold text-black">{plot.roadWidth}' Wide</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Price</p>
                <p className="text-xl font-bold text-black">৳ {(plot.price / 100000).toFixed(1)} Lakh</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Booking</p>
                <p className="text-xl font-bold text-black">৳ {(bookingMoney / 100000).toFixed(1)} Lakh</p>
              </div>
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-black/90 uppercase tracking-widest py-6 text-xs font-bold rounded-none"
              disabled={plot.status !== 'available'}
            >
              {plot.status === 'available' ? 'Book Now' : 'Unavailable'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="mb-16">
      <div className="h-[50vh] relative grayscale">
        <img src={project.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
          <h2 className="text-5xl md:text-7xl font-bold text-black uppercase tracking-tighter">{project.name}</h2>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-xl text-black/60 font-light leading-relaxed">{project.description}</p>
      </div>
    </div>
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
      description: 'A masterpiece of modern urban planning. Nimtola Smart City represents the pinnacle of residential luxury, offering a harmonious blend of nature and technology.'
    },
    purbachal: {
      name: t('projects.purbachal'),
      location: 'Purbachal, Dhaka',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      description: 'Exclusive lake-side living for the elite. Purbachal Green City is designed for those who seek tranquility without compromising on connectivity.'
    }
  };

  const filteredPlots = plotsData.filter((plot) => filterLogic(plot, filters)); // Extracted logic

  return (
    <div className="min-h-screen bg-white pb-20">
      <ProjectCard project={projects[selectedProject]} />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-black pb-4">
          <div className="flex gap-8 mb-4 md:mb-0">
            {(['nimtola', 'purbachal'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProject(p)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${selectedProject === p ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
              >
                {projects[p].name}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="gap-2 rounded-none border-black text-black hover:bg-black hover:text-white uppercase tracking-widest text-xs">
            <Filter className="w-3 h-3" /> Filter Layout
          </Button>
        </div>

        <PlotMap plots={filteredPlots} onPlotClick={setSelectedPlot} />
      </div>

      {showFilters && <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />}
      {selectedPlot && <PlotDetailModal plot={selectedPlot} onClose={() => setSelectedPlot(null)} />}
    </div>
  );
}

function filterLogic(plot: Plot, filters: FilterState) {
  if (filters.status !== 'all' && plot.status !== filters.status) return false;
  if (plot.size < filters.minSize || plot.size > filters.maxSize) return false;
  if (filters.roadWidth !== 'all' && plot.roadWidth !== filters.roadWidth) return false;
  if (filters.corner === 'yes' && !plot.corner) return false;
  if (filters.corner === 'no' && plot.corner) return false;
  if (plot.price < filters.minPrice || plot.price > filters.maxPrice) return false;
  return true;
}
