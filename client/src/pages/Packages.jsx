import { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import API_BASE_URL from '../config/api';

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/packages`)
            .then(res => res.json())
            .then(data => setPackages(data))
            .catch(err => console.error("Error fetching packages:", err));
    }, []);

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-secondary mb-4">Exclusive Packages</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Tailored experiences to make your stay even more memorable.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {packages.map(pkg => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Packages;