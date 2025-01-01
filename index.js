import express from 'express';
import mongoose from 'mongoose';
import routerDocument from './routers/routerDocument.js';
import routerUserSchemas from './routers/routerUserSchemas.js';

const PORT = process.env.PORT || 3000
const DB_URL = "mongodb://localhost:27017/userdb";

const app = express();

app.use(express.json());
app.use('/api/docs', routerDocument);
app.use('/api/schemas', routerUserSchemas);

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log("Сервер працює на порті " + PORT));
    } catch (error) {
        console.log(error);
    }
}

startApp();