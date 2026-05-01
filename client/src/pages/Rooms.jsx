import { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import { motion } from 'framer-motion';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filterPrice, setFilterPrice] = useState(1000);

    useEffect(() => {
        fetch('/api/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error("Error fetching rooms:", err));
    }, []);

    const filteredRooms = rooms.filter(room => room.price <= filterPrice);

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-secondary mb-4">
                        Our Rooms
                    </h1>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-12 max-w-xl mx-auto">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Filter Price: ${filterPrice}
                    </label>

                    <input
                        type="range"
                        min="100"
                        max="1000"
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredRooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </motion.div>

                {filteredRooms.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        No rooms found
                    </div>
                )}

            </div>
        </div>
    );
};

export default Rooms;