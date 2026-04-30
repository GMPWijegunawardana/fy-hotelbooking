const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS for all origins (frontend in Docker/CI/CD can access backend)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Enable JSON parsing
app.use(express.json());

// ----------- Data Loaders ----------- //
const getRooms = () => {
    const filePath = path.join(__dirname, 'data', 'rooms.json');
    if (!fs.existsSync(filePath)) {
        console.error("Rooms file not found:", filePath);
        return [];
    }
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading rooms.json:", error);
        return [];
    }
};

const getPackages = () => {
    const filePath = path.join(__dirname, 'data', 'packages.json');
    if (!fs.existsSync(filePath)) {
        console.error("Packages file not found:", filePath);
        return [];
    }
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading packages.json:", error);
        return [];
    }
};

// ----------- API Routes ----------- //
app.get('/api/rooms', (req, res) => {
    try {
        const rooms = getRooms();
        res.json(rooms);
    } catch (error) {
        console.error("Error sending rooms:", error);
        res.status(500).json({ message: "Error loading rooms data" });
    }
});

app.get('/api/packages', (req, res) => {
    try {
        const packages = getPackages();
        res.json(packages);
    } catch (error) {
        console.error("Error sending packages:", error);
        res.status(500).json({ message: "Error loading packages data" });
    }
});

// ----------- Start Server ----------- //
app.listen(PORT, () => {
    console.log(`Server running in container on http://0.0.0.0:${PORT}`);
});