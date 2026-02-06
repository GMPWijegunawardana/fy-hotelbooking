import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Image Sources: Unsplash & Pexels
// Image Sources: Vibrant Luxury Themes
const IMAGE_1 = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Vibrant Luxury Hotel Exterior (Sunset)
const IMAGE_2 = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Luxury Room with Ocean View
const IMAGE_3 = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Infinity Pool at Sunset

const slides = [
    {
        type: 'image',
        src: IMAGE_1,
        title: 'Welcome to Paradise',
        subtitle: 'Experience luxury, comfort, and unforgettable moments at LuxeHotel.'
    },
    {
        type: 'image',
        src: IMAGE_2,
        title: 'Unwind in Style',
        subtitle: 'Relax in our world-class spa and infinity pools.'
    },
    {
        type: 'image',
        src: IMAGE_3,
        title: 'Exquisite Dining',
        subtitle: 'Savor gourmet flavors from around the globe.'
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000); // 3 seconds per slide per user request
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, ease: "linear" }} // Smooth 3s zoom and fade
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${slides[current].src}")` }}
                >
                    {/* Dark Overlay inside the motion div to scale with it or separate if preferred. 
                        Keeping separate for static overlay is usually better, but here we just replace the content.
                    */}
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Overlay Gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={current}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
                            {slides[current].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light drop-shadow-md">
                            {slides[current].subtitle}
                        </p>
                        <Link
                            to="/rooms"
                            className="inline-block bg-primary text-white px-8 py-3 text-lg rounded-md hover:bg-white hover:text-primary transition duration-300 transform hover:scale-105 shadow-lg border-2 border-primary hover:border-white"
                        >
                            Check Availability
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
