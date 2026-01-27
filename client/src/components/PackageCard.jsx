import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PackageCard = ({ pkg }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100"
        >
            <div className="relative h-48">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                />
                {pkg.type === 'Honeymoon' && (
                    <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        Honeymoon Special
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-secondary">{pkg.name}</h3>
                    <span className="text-primary font-bold text-lg">${pkg.price}</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm h-12">{pkg.description}</p>
                <Link
                    to="/contact"
                    state={{ packageName: pkg.name }}
                    className="block w-full bg-secondary text-white text-center py-2 rounded hover:bg-primary transition shadow-md"
                >
                    Inquire Now
                </Link>
            </div>
        </motion.div>
    );
};

export default PackageCard;
