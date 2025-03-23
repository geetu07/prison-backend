require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',  // Change this if using a remote database
    user: 'root',       // Your MySQL username
    password: 'geetu@7',       // Your MySQL password
    database: 'user_db' // Change this to your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// API Route for Registration
app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, hashedPassword, role], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//login
// Login API Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
});


//search
// Get all prisoner records
// Search prisoner by ID
app.get('/prisoners/search', (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Prisoner ID is required for search" });

    const sql = "SELECT * FROM Prisoner WHERE Prisoner_ID = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error searching prisoner:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// Fetch all prisoner records
app.get('/prisoners/all', (req, res) => {
    const sql = "SELECT * FROM Prisoner";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all prisoners:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});
// Fetch all prisoner records (for enrollment display)
app.get('/prisoners/all', (req, res) => {
    const sql = "SELECT * FROM Prisoner";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all prisoners:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// Enroll a new prisoner (Insert into DB)
app.post("/prisoners/add", (req, res) => {
    const { Name, DOB, Gender, Address, Sentence_Duration } = req.body;  // No Prisoner_ID

    if (!Name || !DOB || !Gender || !Address || !Sentence_Duration) {
        return res.status(400).json({ message: "⚠️ All fields are required!" });
    }

    const sql = `
        INSERT INTO prisoners (Name, DOB, Gender, Address, Sentence_Duration) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [Name, DOB, Gender, Address, Sentence_Duration], (err, result) => {
        if (err) {
            console.error("❌ MySQL Error:", err.sqlMessage);
            return res.status(500).json({ message: "⚠️ Database insertion failed", error: err.sqlMessage });
        }
        res.status(201).json({ message: "✅ Prisoner successfully enrolled!", prisonerId: result.insertId });
    });
});





// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

