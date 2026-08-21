const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "eventdb_AZ"
});
db.connect(err => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("MySQL Connected");
    }
});
app.post("/register", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Registration Failed"
            });
        } else {
            res.json({
                message: "Registration Successful"
            });
        }
    });
});
app.listen(3000, () => {
    console.log("Registration Service running on port 3000");
});
