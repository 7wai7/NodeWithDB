import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pages from './routers/pages.js';
import authRoutes from './routers/authRoutes.js';
import taskRoutes from './routers/taskRoutes.js';

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb://localhost:27017/userdb";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/auth", pages);

app.use((req, res) => {
    res.status(404).send(`<h1>Error 404: Resource not found</h1>`)
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log(`Сервер працює на порті: http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startApp();