const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Event Eclipse server is alive!');
});

app.get('/api/demo', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', role: 'Developer' },
        { id: 2, name: 'Jane Doe', role: 'Manager' }
    ];

    res.json({
        success: true,
        message: 'User data fetched successfully',
        data: users
    });
});

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/data', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log("Successfully connected to the database.");
        res.json(rows);
    } catch (err) {
        console.error("Failed to connect to the database.", err);
        res.status(500).send("Failed to connect to the database.");
    } finally {
        if (conn) conn.end();
    }
});

app.get('/api/events', async (req, res) => {
    const sql = `SELECT * FROM events;`;

    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(sql);
        console.log("Fetched events successfully.");
        res.json({
            success: true,
            message: 'Events fetched successfully',
            data: rows
        });
    } catch (err) {
        console.error("Failed to fetch events.", err);
        res.status(500).send({
            success: false,
            message: "Failed to fetch events."
        });
    } finally {
        if (conn) conn.release();
    }
});


app.listen(port, () => {
    console.log(`Event Eclipse server is running on port: ${port}`);
});
