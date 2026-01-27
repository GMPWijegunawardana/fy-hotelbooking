import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import RoomCard from '../components/RoomCard';
import PackageCard from '../components/PackageCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomsRes = await axios.get('http://localhost:5000/api/rooms');
                const packagesRes = await axios.get('http://localhost:5000/api/packages');
                setRooms(roomsRes.data.slice(0, 3)); // Featured rooms
                setPackages(packagesRes.data.slice(0, 3)); // Featured packages
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Hero />

            {/* Featured Rooms */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-secondary">Featured Rooms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {rooms.map(room => <RoomCard key={room.id} room={room} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/rooms" className="text-primary hover:text-secondary font-semibold border-b-2 border-primary hover:border-secondary transition">View All Rooms</Link>
                    </div>
                </div>
            </section>

            {/* Featured Packages */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-secondary">Exclusive Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/packages" className="text-primary hover:text-secondary font-semibold border-b-2 border-primary hover:border-secondary transition">View All Packages</Link>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 bg-secondary text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hotel Interior" className="rounded-lg shadow-2xl" />
                    </div>
                    <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                        <h2 className="text-4xl font-serif font-bold mb-6 text-primary">Our Story</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Nestled in the heart of paradise, LuxeHotel has been defining luxury for over 20 years.
                            We believe in creating moments that last a lifetime, blending world-class hospitality with the serene beauty of nature.
                        </p>
                        <Link to="/about" className="bg-primary text-white px-8 py-3 rounded hover:bg-white hover:text-primary transition">Discover More</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
