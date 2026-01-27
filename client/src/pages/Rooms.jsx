import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import { motion } from 'framer-motion';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filterPrice, setFilterPrice] = useState(1000);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms')
            .then(res => setRooms(res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredRooms = rooms.filter(room => room.price <= filterPrice);

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-secondary mb-4">Our Rooms</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Discover comfort and elegance in our carefully curated selection of rooms and suites.</p>
                </div>

                {/* Filter */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-12 max-w-xl mx-auto">
                    <label className="block text-gray-700 font-semibold mb-2">Filter by Max Price: ${filterPrice}</label>
                    <input
                        type="range"
                        min="100"
                        max="500"
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>$100</span>
                        <span>$500+</span>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {filteredRooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </motion.div>

                {filteredRooms.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">No rooms found in this price range.</div>
                )}
            </div>
        </div>
    );
};

export default Rooms;
