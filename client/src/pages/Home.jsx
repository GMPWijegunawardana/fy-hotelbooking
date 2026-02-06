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
            <section className="py-20 bg-transparent">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#05445E]">Featured Rooms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {rooms.map(room => <RoomCard key={room.id} room={room} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/rooms" className="text-[#05445E] hover:text-[#189AB4] font-semibold border-b-2 border-[#05445E] hover:border-[#189AB4] transition">View All Rooms</Link>
                    </div>
                </div>
            </section>

            {/* Featured Packages */}
            <section className="py-20 bg-[#D4F1F4]/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#05445E]">Exclusive Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/packages" className="text-[#05445E] hover:text-[#189AB4] font-semibold border-b-2 border-[#05445E] hover:border-[#189AB4] transition">View All Packages</Link>
                    </div>
                </div>
            </section>

            {/* Ocean Video Section */}
            <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-black">
                <video
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-60"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://videos.pexels.com/video-files/10593002/10593002-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 text-center text-white px-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-md">Serenity by the Sea</h2>
                    <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto drop-shadow-md">
                        Let the sound of the waves wash away your worries. Experience the ultimate relaxation at our oceanfront paradise.
                    </p>
                    <Link to="/contact" className="bg-white text-secondary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition duration-300 font-semibold shadow-lg">
                        Book Your Escape
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
