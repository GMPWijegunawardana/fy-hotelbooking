const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load data
const getRooms = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'rooms.json'));
    return JSON.parse(data);
};

const getPackages = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'packages.json'));
    return JSON.parse(data);
};

// Routes
app.get('/api/rooms', (req, res) => {
    try {
        const rooms = getRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error loading rooms data" });
    }
});

app.get('/api/packages', (req, res) => {
    try {
        const packages = getPackages();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: "Error loading packages data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
