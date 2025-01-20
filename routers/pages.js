import Router from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

router.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/auth/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.get('/workspace', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'workspace.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

export default router;
