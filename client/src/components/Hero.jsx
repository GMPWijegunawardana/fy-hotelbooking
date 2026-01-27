import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        type: 'video',
        src: 'https://videos.pexels.com/video-files/3209663/3209663-uhd_2560_1440_25fps.mp4',
        title: 'Welcome to Paradise',
        subtitle: 'Experience luxury, comfort, and unforgettable moments at LuxeHotel.'
    },
    {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Unwind in Style',
        subtitle: 'Relax in our world-class spa and infinity pools.'
    },
    {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
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
        }, 3000); // 3 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    {slides[current].type === 'video' ? (
                        <video
                            src={slides[current].src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60"
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-center opacity-60"
                            style={{ backgroundImage: `url("${slides[current].src}")` }}
                        />
                    )}
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
