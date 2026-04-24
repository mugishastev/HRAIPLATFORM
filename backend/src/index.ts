import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import appRoutes from './routes';
import { logActivity } from './middleware/logger.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set trust proxy for Vercel/rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(logActivity);

// Main API Routes
app.use('/api', appRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.send('Umurava AI Hackathon API run successfully.');
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start Server
const startServer = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI is not set in .env. Exiting.');
            process.exit(1);
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️  GEMINI_API_KEY is not set. AI screening will fail.');
        }

        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully.');
        console.log(`🤖 AI Model: ${process.env.GEMINI_MODEL || 'gemini-2.5-flash'}`);

        app.listen(PORT, () => {
            console.log(`\n🚀 Server running on http://localhost:${PORT}`);
            console.log(`🩺 Health check → http://localhost:${PORT}/health\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
