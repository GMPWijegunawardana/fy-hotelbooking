import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-4">LuxeHotel</h3>
                        <p className="text-gray-300">
                            Experience the pinnacle of luxury and comfort. Your perfect getaway awaits.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                            <li><Link to="/rooms" className="text-gray-300 hover:text-white transition">Rooms</Link></li>
                            <li><Link to="/packages" className="text-gray-300 hover:text-white transition">Packages</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Contact</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>No 321, Sea Street, Colombo</li>
                            <li>+94 (702) 487 500</li>
                            <li>info@luxehotel.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Newsletter</h4>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-primary outline-none"
                            />
                            <button className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} LuxeHotel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
