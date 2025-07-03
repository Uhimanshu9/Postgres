// create a pg client and then add a table in it
import { Client } from 'pg';
// import { config } from 'dotenv';

const clint = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mypassword',
    port: 5432,
});

async function main() {
    try {
        await clint.connect();
        console.log('Connected to the database successfully!');

        const result = await clint.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
        `);
        console.log('Table created successfully:', result);
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
    await clint.end(); // Close the client connection
  }
    
}
main()