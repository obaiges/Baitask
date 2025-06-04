import { query } from "../../conexion";

export class AuthRepository {
    constructor() { }

    async login(username: string, password: string) {
        return await query('SELECT * FROM usuarios where email = ? or username = ?;', [username, username]);
    }

    async register(email: string, password: string) {
        return await query(`INSERT INTO usuarios (id, email, password) VALUES (UUID(), ?, ?);`, [email, password]);
    }
}