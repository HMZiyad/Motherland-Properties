import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function Gallery() {
    const images = [
        { src: "https://images.unsplash.com/photo-1600596542815-60c37c663b12?auto=format&fit=crop&q=80&w=800", category: "Projects" },
        { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", category: "Interior" },
        { src: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&q=80&w=800", category: "Handover" },
        { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", category: "Exterior" },
        { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", category: "Projects" },
        { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", category: "Amenities" },
        { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800", category: "Events" },
        { src: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800", category: "Awards" },
        { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", category: "Aerial View" },
    ];

    return (
        <div className="min-h-screen pt-20">
            <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Gallery
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A glimpse into our world. Explore our completed projects, ongoing developments, and memorable moments.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="overflow-hidden group h-64 md:h-80 relative cursor-pointer border-none shadow-md hover:shadow-2xl transition-all duration-300">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10" />
                                    <img
                                        src={image.src}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <span className="text-white font-medium">{image.category}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
