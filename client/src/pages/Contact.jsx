import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
    const location = useLocation();
    const initialSubject = location.state?.roomName ? `Booking Inquiry: ${location.state.roomName}` :
        location.state?.packageName ? `Package Inquiry: ${location.state.packageName}` : '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: initialSubject,
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Message Sent! We will contact you shortly.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-lg shadow-xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-secondary mb-4">Contact Us</h1>
                    <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="Inquiry subject"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-4 rounded hover:bg-secondary transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
