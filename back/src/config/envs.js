import dotenv from 'dotenv';

// Load environment variables from .env file

dotenv.config();

// Get environment variables

export const port = process.env.PORT || 3000