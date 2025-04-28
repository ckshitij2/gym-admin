// src/controllers/clientController.js
const db = require("../db/db"); // Import the PostgreSQL connection

// List all clients
exports.listClients = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM clients");
    res.render("clients/list", { clients: result.rows });
  } catch (err) {
    console.error("Error retrieving clients:", err);
    res.status(500).send("Error retrieving clients");
  }
};

// Add new client form
exports.addClientForm = (req, res) => {
  res.render("clients/add"); // Render add.hbs
};

// Add new client
exports.addClient = async (req, res) => {
  const {
    first_name,
    last_name,
    age,
    phone_number,
    weight,
    height,
    bmi,
    address,
    start_date,
    membership_type,
    fees_amount,
    fees_status,
  } = req.body;
  try {
    await db.query(
      "INSERT INTO clients (first_name, last_name, age, phone_number, weight, height, bmi, address, start_date, membership_type, fees_amount, fees_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        first_name,
        last_name,
        age,
        phone_number,
        weight,
        height,
        bmi,
        address,
        start_date,
        membership_type,
        fees_amount,
        fees_status,
      ]
    );
    res.redirect("/clients"); // Redirect to list of clients
  } catch (err) {
    console.error("Error adding client:", err);
    res.status(500).send("Error adding client");
  }
};

// Edit client form
exports.editClientForm = async (req, res) => {
  const clientId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM clients WHERE id = $1", [
      clientId,
    ]);
    res.render("clients/edit", { client: result.rows[0] }); // Render edit.hbs
  } catch (err) {
    console.error("Error retrieving client:", err);
    res.status(500).send("Error retrieving client");
  }
};

// Edit client
exports.editClient = async (req, res) => {
  const clientId = req.params.id;
  const {
    first_name,
    last_name,
    age,
    phone_number,
    weight,
    height,
    bmi,
    address,
    start_date,
    membership_type,
    fees_amount,
    fees_status,
  } = req.body;
  try {
    await db.query(
      "UPDATE clients SET first_name = $1, last_name = $2, age = $3, phone_number = $4, weight = $5, height = $6, bmi = $7, address = $8, start_date = $9, membership_type = $10, fees_amount = $11, fees_status = $12 WHERE id = $13",
      [
        first_name,
        last_name,
        age,
        phone_number,
        weight,
        height,
        bmi,
        address,
        start_date,
        membership_type,
        fees_amount,
        fees_status,
        clientId,
      ]
    );
    res.redirect("/clients");
  } catch (err) {
    console.error("Error editing client:", err);
    res.status(500).send("Error editing client");
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    await db.query("DELETE FROM clients WHERE id = $1", [clientId]);
    res.redirect("/clients");
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).send("Error deleting client");
  }
};
