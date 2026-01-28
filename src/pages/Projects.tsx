import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

type PlotStatus = 'available' | 'booked' | 'sold';

interface Plot {
  id: string;
  status: PlotStatus;
  size: number;
  roadWidth: number;
  corner: boolean;
  price: number;
}

// Plot data
const plotsData: Plot[] = [
  { id: 'A1', status: 'available', size: 3, roadWidth: 20, corner: true, price: 4500000 },
  { id: 'A2', status: 'available', size: 3, roadWidth: 20, corner: false, price: 4000000 },
  { id: 'A3', status: 'booked', size: 5, roadWidth: 25, corner: false, price: 6500000 },
  { id: 'A4', status: 'sold', size: 3, roadWidth: 20, corner: false, price: 4000000 },
  { id: 'A5', status: 'available', size: 5, roadWidth: 30, corner: true, price: 7500000 },
  { id: 'B1', status: 'available', size: 3, roadWidth: 20, corner: false, price: 3800000 },
  { id: 'B2', status: 'booked', size: 5, roadWidth: 25, corner: false, price: 6200000 },
  { id: 'B3', status: 'available', size: 7, roadWidth: 30, corner: true, price: 9500000 },
  { id: 'B4', status: 'sold', size: 3, roadWidth: 20, corner: false, price: 3900000 },
  { id: 'B5', status: 'available', size: 5, roadWidth: 25, corner: false, price: 6000000 },
  { id: 'C1', status: 'sold', size: 3, roadWidth: 20, corner: true, price: 4200000 },
  { id: 'C2', status: 'available', size: 5, roadWidth: 25, corner: false, price: 6100000 },
  { id: 'C3', status: 'booked', size: 3, roadWidth: 20, corner: false, price: 3700000 },
  { id: 'C4', status: 'available', size: 7, roadWidth: 30, corner: false, price: 8800000 },
  { id: 'C5', status: 'available', size: 5, roadWidth: 25, corner: true, price: 7000000 },
];
// Filter Panel Component

// Filter Panel Component
function FilterPanel({
  filters,
  setFilters,
  onClose,
}: {
  filters: any;
  setFilters: (f: any) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 bottom-0 w-80 bg-card shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold">{t('projects.filterTitle')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'available', 'booked', 'sold'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters({ ...filters, status })}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    filters.status === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {status === 'all' ? 'All' : t(`projects.${status}` as any)}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Plot Size: {filters.minSize} - {filters.maxSize} Katha
            </label>
            <Slider
              value={[filters.minSize, filters.maxSize]}
              min={2}
              max={10}
              step={1}
              onValueChange={([min, max]) => setFilters({ ...filters, minSize: min, maxSize: max })}
            />
          </div>

          {/* Road Width Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Road Width</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 20, 25, 30].map((width) => (
                <button
                  key={width}
                  onClick={() => setFilters({ ...filters, roadWidth: width })}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.roadWidth === width
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {width === 'all' ? 'All' : `${width}ft`}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Plot */}
          <div>
            <label className="text-sm font-medium mb-2 block">Corner Plot</label>
            <div className="flex gap-2">
              {['all', 'yes', 'no'].map((corner) => (
                <button
                  key={corner}
                  onClick={() => setFilters({ ...filters, corner })}
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    filters.corner === corner
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {corner === 'all' ? 'All' : corner === 'yes' ? 'Corner' : 'Regular'}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Price: ৳{(filters.minPrice / 100000).toFixed(0)}L - ৳{(filters.maxPrice / 100000).toFixed(0)}L
            </label>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              min={3000000}
              max={10000000}
              step={500000}
              onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
            />
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                status: 'all',
                minSize: 2,
                maxSize: 10,
                roadWidth: 'all',
                corner: 'all',
                minPrice: 3000000,
                maxPrice: 10000000,
              })
            }
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Plot Map Component
function PlotMap({ plots, onPlotClick }: { plots: Plot[]; onPlotClick: (plot: Plot) => void }) {
  const { t } = useLanguage();

  const getStatusColor = (status: PlotStatus) => {
    switch (status) {
      case 'available':
        return 'bg-plot-available hover:bg-plot-available/80';
      case 'booked':
        return 'bg-plot-booked hover:bg-plot-booked/80';
      case 'sold':
        return 'bg-plot-sold hover:bg-plot-sold/80';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-plot-available" />
          <span className="text-sm">{t('projects.available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-plot-booked" />
          <span className="text-sm">{t('projects.booked')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-plot-sold" />
          <span className="text-sm">{t('projects.sold')}</span>
        </div>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-5 gap-2">
        {plots.map((plot) => (
          <motion.button
            key={plot.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlotClick(plot)}
            className={`aspect-square rounded-lg text-white font-semibold text-sm flex items-center justify-center cursor-pointer transition-colors ${getStatusColor(plot.status)}`}
          >
            {plot.id}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Plot Detail Modal
function PlotDetailModal({ plot, onClose }: { plot: Plot | null; onClose: () => void }) {
  const { t } = useLanguage();

  if (!plot) return null;

  const getStatusColor = (status: PlotStatus) => {
    switch (status) {
      case 'available':
        return 'bg-plot-available';
      case 'booked':
        return 'bg-plot-booked';
      case 'sold':
        return 'bg-plot-sold';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl font-bold">Plot {plot.id}</h3>
          <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(plot.status)}`}>
            {t(`projects.${plot.status}` as any)}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b">
            <span className="text-muted-foreground">Plot Size</span>
            <span className="font-semibold">{plot.size} Katha</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-muted-foreground">Road Width</span>
            <span className="font-semibold">{plot.roadWidth} ft</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-muted-foreground">Corner Plot</span>
            <span className="font-semibold">{plot.corner ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-muted-foreground">Price</span>
            <span className="font-bold text-xl text-primary">৳{plot.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {plot.status === 'available' && (
            <Button className="flex-1">Book Now</Button>
          )}
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-display text-2xl font-bold mb-1">{project.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{project.totalPlots}</p>
            <p className="text-xs text-muted-foreground">Total Plots</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-plot-available">{project.available}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">{project.priceStart}</p>
            <p className="text-xs text-muted-foreground">Starting</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedProject, setSelectedProject] = useState<'nimtola' | 'purbachal'>('nimtola');
  const [filters, setFilters] = useState({
    status: 'all',
    minSize: 2,
    maxSize: 10,
    roadWidth: 'all' as 'all' | number,
    corner: 'all' as 'all' | 'yes' | 'no',
    minPrice: 3000000,
    maxPrice: 10000000,
  });

  const projects = {
    nimtola: {
      name: t('projects.nimtola'),
      location: 'Savar, Dhaka',
      description: 'A modern smart city project with all civic amenities, wide roads, and beautiful landscaping.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      totalPlots: '250+',
      available: '120',
      priceStart: '৳35L',
    },
    purbachal: {
      name: t('projects.purbachal'),
      location: 'Purbachal, Dhaka',
      description: 'Premium lake-view plots in the heart of Purbachal New Town with excellent connectivity.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      totalPlots: '180+',
      available: '85',
      priceStart: '৳45L',
    },
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
              {t('projects.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {(['nimtola', 'purbachal'] as const).map((project) => (
            <button
              key={project}
              onClick={() => setSelectedProject(project)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedProject === project
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {projects[project].name}
            </button>
          ))}
        </div>

        {/* Project Info */}
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProjectCard project={projects[selectedProject]} />
        </motion.div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold">Plot Availability</h2>
          <Button variant="outline" onClick={() => setShowFilters(true)} className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Plot Map */}
        <PlotMap plots={filteredPlots} onPlotClick={setSelectedPlot} />

        {/* Gallery Section */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
              'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
              'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden"
              >
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <>
          <div className="fixed inset-0 bg-foreground/30 z-40" onClick={() => setShowFilters(false)} />
          <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setShowFilters(false)} />
        </>
      )}

      {/* Plot Detail Modal */}
      {selectedPlot && <PlotDetailModal plot={selectedPlot} onClose={() => setSelectedPlot(null)} />}
    </div>
  );
}
