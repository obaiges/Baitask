import { query } from "../../conexion";

export class AuthRepository {
    constructor() { }

    async login(username: string, password: string) {
        return await query('SELECT * FROM usuarios where email = ? or username = ?);', [username, username]);
    }

    async register(email: string, name: string, password: string) {
        return await query(`INSERT INTO usuarios (id, email, username, password, date_add) VALUES (UUID(), ?, ?, ?, now());`, [email, name, password]);
    }

    async exists(email: string) {
        return await query('SELECT * FROM usuarios where email = ?', [email]);
    }

    async checkUsername(username: string) {
        return await query('SELECT * FROM usuarios where username = ?;', [username]);
    }
}