import mysql from 'mysql';
import { conf } from './conf';
import { promisify } from 'util';

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.dbname,
});

export const query = promisify(pool.query).bind(pool);