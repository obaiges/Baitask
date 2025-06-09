import { Router } from 'express';
import { AuthRepository } from './authRepository';
import bcrypt from 'bcrypt';
import { conf } from '../../conf';

const jwt = require('jsonwebtoken');
const authRouter = Router();
const authRepo = new AuthRepository()


const saltRounds = 10; // número de rondas para generar el salt, 10 es un valor común

async function hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
}

async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const users = await authRepo.login(username);
    if (users.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    const user = users[0];
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
        { id: user.guid, username: user.username }, // payload
        conf.secret_key, // secret
        { expiresIn: '1h' } // duración del token
    );
    res.json({ token });
});

authRouter.post('/checkRegistrer', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const emailValidation = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email.match(emailValidation)) {
        return res.status(406).json({ error: 'Formato de email incorrecto' });
    }

    const exists = await authRepo.exists(email);
    if (exists.length > 0) {
        return res.status(409).json({ error: 'El email ya existe' });
    }

    res.status(201).json({ mensaje: 'Verificado' });
});

authRouter.post('/checkUsername', async (req, res) => {
    const { username } = req.body;

    const exists = await authRepo.checkUsername(username);
    if (exists.length > 0) {
        return res.status(409).json({ error: 'El nombre de usuario ya existe' });
    }

    if (username.length < 3) {
        return res.status(406).json({ error: 'El nombre de usuario debe tener al menos 3 caracteres' });
    }
    res.status(201).json({ mensaje: 'Nombre de usuario válido' });
});

authRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    const hashedPassword = await hashPassword(password);
    await authRepo.register(email, name, hashedPassword);

    res.status(201).json({ mensaje: 'Usuario registrado' });
});

export default authRouter;