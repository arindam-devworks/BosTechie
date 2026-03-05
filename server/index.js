import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import campaignRoutes from './src/routes/campaignRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/campaigns', campaignRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 Campaign Server running on http://localhost:${PORT}`);
});
