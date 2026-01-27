const About = () => {
    return (
        <div className="pt-20 pb-20">
            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Hotel Exterior"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-5xl font-serif font-bold text-secondary mb-6">Our Story</h1>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            LuxeHotel was founded in 2005 with a vision to create a sanctuary where luxury meets nature.
                            What started as a small boutique hotel has grown into an award-winning resort, loved by travelers from around the globe.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We pride ourselves on our attention to detail, personalized service, and commitment to sustainability.
                            Every corner of our hotel is designed to offer peace and tranquility.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats/Facilities */}
            <div className="bg-secondary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">50+</div>
                        <div className="text-gray-300">Luxury Rooms</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">15</div>
                        <div className="text-gray-300">Years of Service</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                        <div className="text-gray-300">Happy Guests</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">5</div>
                        <div className="text-gray-300">Star Rating</div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-serif font-bold text-secondary mb-12">Guest Testimonials</h2>
                <blockquote className="text-xl italic text-gray-600 font-serif">
                    "The best hotel experience I've ever had. Comparing the service, the food, and the ambience - everything was perfect."
                </blockquote>
                <div className="mt-6 font-bold text-primary">- Sarah Johnson</div>
            </div>
        </div>
    );
};

export default About;
