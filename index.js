import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './src/Utils/Logger.js';
import UserRoutes from './src/Routes/UserRoutes.js';
import sequelize from './config/database.js';

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
