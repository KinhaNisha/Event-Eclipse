const express = require('express');
const ip = require('ip');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./src/Utils/Logger.js'); 
const UserRoutes = require('./src/Routes/UserRoutes.js'); 
const sequelize = require('./config/database.js'); 


dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Define different base paths for API versions
const v1Router = express.Router();
const v2Router = express.Router();

// Use API versions as base paths
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

v1Router.use('/user', UserRoutes);
v2Router.use('/user', UserRoutes);

app.get('/checkdb', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).send('Database connection successful');
    } catch (error) {
        res.status(500).send('Failed to connect to the database');
    }
});

app.listen(PORT, () => {
    logger.info(`Event Eclipse server is running on: http://${ip.address()}:${PORT}`);
});
