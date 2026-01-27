import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-serif font-bold text-secondary">
                            LuxeHotel
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary transition">Home</Link>
                        <Link to="/rooms" className="text-gray-600 hover:text-primary transition">Rooms</Link>
                        <Link to="/packages" className="text-gray-600 hover:text-primary transition">Packages</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary transition">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary transition">Contact</Link>
                        <Link to="/rooms" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition">
                            Book Now
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
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

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/rooms" className="block px-3 py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Rooms</Link>
                        <Link to="/packages" className="block px-3 py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Packages</Link>
                        <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
