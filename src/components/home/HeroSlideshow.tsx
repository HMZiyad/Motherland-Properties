import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    // Greenery / Nature (Matches Sonar Bangla)
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop",
    // Modern Architecture / Interior (Premium feel)
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    // Blue Sky / Open Land (Freedom)
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2940&auto=format&fit=crop",
    // Luxury Exterior (Aspiration)
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
];

export function HeroSlideshow({ currentIndex }: { currentIndex: number }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={images[currentIndex]}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay for text readability - Darker for White Text */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
    );
}
