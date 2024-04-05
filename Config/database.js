// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//   host: 'mariadb',
//   user: 'event_eclipse',
//   password: 'event_eclipse',
//   database: 'event_eclipse'
// });

// app.get('/data', async (req, res) => {
//   let conn;
//   try {
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       console.log("Successfully connected to the database.");
//       res.json(rows);
//   } catch (err) {
//       console.error("Failed to connect to the database.", err);
//       res.status(500).send("Failed to connect to the database.");
//   } finally {
//       if (conn) conn.end();
//   }
// });
