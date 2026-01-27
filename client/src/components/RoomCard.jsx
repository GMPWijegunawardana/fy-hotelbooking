import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RoomCard = ({ room }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-secondary text-white px-4 py-1">
                    ${room.price} <span className="text-sm">/ night</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary transition">{room.name}</h3>

                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">Size: {room.size}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Cap: {room.capacity}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities && room.amenities.map((amenity, index) => (
                        <span key={index} className="text-xs border border-gray-200 px-2 py-0.5 rounded-full text-gray-600">{amenity}</span>
                    ))}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                <Link
                    to="/contact"
                    state={{ roomName: room.name }}
                    className="inline-block border border-secondary text-secondary px-6 py-2 rounded hover:bg-secondary hover:text-white transition w-full text-center"
                >
                    Book Now
                </Link>
            </div>
        </motion.div>
    );
};

export default RoomCard;
