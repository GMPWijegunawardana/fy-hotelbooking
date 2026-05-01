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
                const roomsRes = await axios.get('/api/rooms');
                const packagesRes = await axios.get('/api/packages');

                setRooms(roomsRes.data.slice(0, 3));
                setPackages(packagesRes.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Hero />

            <section className="py-20 bg-transparent">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#05445E]">
                        Featured Rooms
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {rooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/rooms"
                            className="text-[#05445E] hover:text-[#189AB4] font-semibold border-b-2 border-[#05445E] hover:border-[#189AB4] transition"
                        >
                            View All Rooms
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#D4F1F4]/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#05445E]">
                        Exclusive Packages
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/packages"
                            className="text-[#05445E] hover:text-[#189AB4] font-semibold border-b-2 border-[#05445E] hover:border-[#189AB4] transition"
                        >
                            View All Packages
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;