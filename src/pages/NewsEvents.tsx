import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewsEvents() {
    const newsItems = [
        {
            id: 1,
            title: "Annual Plot Fair 2024",
            date: "March 15, 2024",
            category: "Event",
            image: "https://images.unsplash.com/photo-1540575467063-178a50935339?auto=format&fit=crop&q=80&w=800",
            description: "Join us for our biggest annual plot fair featuring exclusive discounts on new projects."
        },
        {
            id: 2,
            title: "New Project 'Green Valley' Launched",
            date: "February 28, 2024",
            category: "News",
            image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=800",
            description: "We are proud to announce the launch of our eco-friendly residential project in Purbachal."
        },
        {
            id: 3,
            title: "Best Real Estate Developer Award",
            date: "January 14, 2024",
            category: "Achievement",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
            description: "Motherland Properties has been recognized as the best emerging developer of the year."
        },
        {
            id: 4,
            title: "Customer Appreciation Day",
            date: "December 20, 2023",
            category: "Event",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
            description: "A day dedicated to our valued customers with gala dinner and cultural program."
        },
        {
            id: 5,
            title: "Infrastructure Development Update",
            date: "November 10, 2023",
            category: "Update",
            image: "https://images.unsplash.com/photo-1590674899505-1c5c41951f38?auto=format&fit=crop&q=80&w=800",
            description: "Road construction and utility setup in Block B has been completed ahead of schedule."
        },
        {
            id: 6,
            title: "Winter Housing Expo",
            date: "October 05, 2023",
            category: "Event",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
            description: "Explore our winter collection of ready plots at the Housing Expo 2023."
        }
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
                            News & Events
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Stay updated with the latest news, events, and milestones of Motherland Properties.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10">
                                            {item.category}
                                        </div>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground line-clamp-3">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary gap-2 group/btn">
                                            Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
