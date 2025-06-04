import { Router } from 'express';
import { AuthRepository } from './authRepository';
import bcrypt from 'bcrypt';

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

    const users = await authRepo.login(username, password);
    if (users.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    const user = users[0];
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ user });
});

authRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

    const hashedPassword = await hashPassword(password);

    const newUser = await authRepo.register(email, hashedPassword);
    console.log(newUser);

    res.json({ mensaje: 'Usuario registrado' });
});

export default authRouter;