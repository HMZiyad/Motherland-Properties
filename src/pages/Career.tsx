import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Career() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // CONFIGURATION: Replace these with your actual Google Form Entry IDs
    // To find these: Open your Google Form, right-click "Inspect", search for "entry."
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc5CJEjjMn9JHXed2EdFTd_x1NA46kvtmnyngP8Lqpvzen5fg/formResponse";

    const ENTRY_IDS = {
        name: "entry.73736535",
        email: "entry.294127848",
        phone: "entry.15042099",
        position: "entry.1846579229",
        link: "entry.1225719473",
        about: "entry.1786012047",
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        link: '',
        about: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formBody = new FormData();
        formBody.append(ENTRY_IDS.name, formData.name);
        formBody.append(ENTRY_IDS.email, formData.email);
        formBody.append(ENTRY_IDS.phone, formData.phone);
        formBody.append(ENTRY_IDS.position, formData.position);
        formBody.append(ENTRY_IDS.link, formData.link);
        formBody.append(ENTRY_IDS.about, formData.about);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors", // This is essential for Google Forms
                body: formBody,
            });
            toast.success('Application submitted successfully!');
            setFormData({ name: '', email: '', phone: '', position: '', link: '', about: '' });
        } catch (error) {
            toast.error('Failed to submit application. Please try again.');
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const benefits = [
        "Competitive Salary Packages",
        "Professional Growth Opportunities",
        "Positive Work Environment",
        "Health & Insurance Benefits",
        "Annual Bonuses",
        "Training & Development"
    ];

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
                            Join Our Team
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Build your career with Motherland Properties. We are always looking for talented individuals to join our growing family.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="font-display text-3xl font-bold mb-6">Why Join Us?</h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    At Motherland Properties, we believe that our people are our greatest asset. We foster a culture of innovation, integrity, and collaboration.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3 bg-secondary/20 p-4 rounded-xl">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Card className="bg-primary/5 border-primary/10">
                                <CardContent className="p-8">
                                    <Briefcase className="w-10 h-10 text-primary mb-4" />
                                    <h3 className="font-display text-xl font-bold mb-2">Current Openings</h3>
                                    <p className="text-muted-foreground">
                                        We are currently hiring for Sales Executives, Digital Marketing Specialists, and Customer Support Representatives. Apply now!
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Application Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="shadow-xl">
                                <div className="bg-secondary/50 p-6 border-b border-border text-center">
                                    <h3 className="font-display text-2xl font-bold">Application Form</h3>
                                    <p className="text-muted-foreground text-sm mt-2">Candidate Details</p>
                                </div>
                                <CardContent className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                    placeholder="+880 1XXX-XXXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="position">Position Applied For</Label>
                                            <Input
                                                id="position"
                                                value={formData.position}
                                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                required
                                                placeholder="e.g. Sales Executive"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="link">Portfolio / CV Link</Label>
                                            <Input
                                                id="link"
                                                type="url"
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                required
                                                placeholder="Google Drive / LinkedIn / Website URL"
                                            />
                                            <p className="text-xs text-muted-foreground">Please provide a accessible link to your CV or Portfolio</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="about">Tell us about you</Label>
                                            <Textarea
                                                id="about"
                                                value={formData.about}
                                                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                                placeholder="Briefly describe your background and why you're a good fit..."
                                                rows={4}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                        </Button>
                                        <p className="text-xs text-center text-muted-foreground mt-4">
                                            This form submits data securely to our internal system via Google Forms.
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
