require("dotenv").config(); // Load environment variables from .env file

const { Client } = require("pg");

// Get PostgreSQL connection details from environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to connect to the database
const connectDb = async () => {
  try {
    await client.connect(); // Connect to the PostgreSQL database
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err.stack);
    process.exit(1); // Exit the process in case of connection failure
  }
};

// Ensure that we export both the client and the connectDb function
module.exports = {
  client,
  connectDb,
};
