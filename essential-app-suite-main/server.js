import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// Uploads folder ko static banana taake browser se CV dekha ja sake
app.use('/uploads', express.static('uploads'));

// 1. Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'smart_hiring_db'
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("MySQL Connected for AI System!");
});

// 2. Multer Setup (Folder banana aur file save karne ki settings)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- ROUTES ---

// A. Candidate Registration (Data aur Resume save karne ke liye)
app.post('/api/register-candidate', upload.single('resume'), (req, res) => {
  const { name, email, skills } = req.body;
  const resumePath = req.file ? req.file.path : null;

  const sql = "INSERT INTO users (name, email, resume_path, skills) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, resumePath, skills], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Success! Details and Resume saved in MySQL", id: result.insertId });
  });
});

// B. Fetch Candidates (Dashboard par list dikhane ke liye)
app.get('/api/candidates', (req, res) => {
    const sql = "SELECT * FROM users ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. Start Server
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});