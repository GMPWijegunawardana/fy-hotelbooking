const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// ---------------- CORS (CI/CD SAFE) ---------------- //
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// ---------------- FIX: SAFE DATA PATH ---------------- //
// Important for Docker volume compatibility

const dataPath = (file) => path.join(__dirname, 'data', file);

// ---------------- DATA LOADERS ---------------- //
const getRooms = () => {
    const filePath = dataPath('rooms.json');

    try {
        if (!fs.existsSync(filePath)) {
            console.error("Rooms file missing:", filePath);
            return [];
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);

    } catch (error) {
        console.error("Error reading rooms.json:", error);
        return [];
    }
};

const getPackages = () => {
    const filePath = dataPath('packages.json');

    try {
        if (!fs.existsSync(filePath)) {
            console.error("Packages file missing:", filePath);
            return [];
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);

    } catch (error) {
        console.error("Error reading packages.json:", error);
        return [];
    }
};

// ---------------- API ROUTES ---------------- //
app.get('/', (req, res) => {
    res.json({
        status: "OK",
        message: "Hotel Booking API is running successfully. Access endpoints at /api/rooms or /api/packages."
    });
});

app.get('/api/rooms', (req, res) => {
    const rooms = getRooms();
    res.json(rooms);
});

app.get('/api/packages', (req, res) => {
    const packages = getPackages();
    res.json(packages);
});

// ---------------- HEALTH CHECK (CI/CD BEST PRACTICE) ---------------- //
app.get('/api/health', (req, res) => {
    res.json({
        status: "OK",
        message: "Server running successfully"
    });
});

// ---------------- START SERVER ---------------- //
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});