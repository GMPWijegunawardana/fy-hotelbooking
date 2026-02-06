import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for Glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if we are on the home page (for transparent header logic)
    const isHome = location.pathname === '/';

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled || !isHome
                ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className={`text-3xl font-serif font-bold tracking-wide transition-colors duration-300 ${scrolled || !isHome ? 'text-secondary' : 'text-white'
                            }`}>
                            LuxeHotel
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'Rooms', 'Packages', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`text-lg font-medium transition duration-300 relative group ${scrolled || !isHome ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled || !isHome ? 'bg-primary' : 'bg-white'
                                    }`}></span>
                            </Link>
                        ))}
                        <Link
                            to="/rooms"
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${scrolled || !isHome
                                ? 'bg-primary text-white hover:bg-secondary'
                                : 'bg-white text-secondary hover:bg-opacity-90'
                                }`}
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`focus:outline-none transition-colors duration-300 ${scrolled || !isHome ? 'text-gray-800' : 'text-white'
                                }`}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } bg-white shadow-xl`}>
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {['Home', 'Rooms', 'Packages', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to="/rooms"
                        className="block w-full text-center mt-4 px-3 py-3 bg-primary text-white rounded-md font-bold hover:bg-secondary transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
