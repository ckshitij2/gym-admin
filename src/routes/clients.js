// src/routes/clients.js
const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientsController");

// List all clients
router.get("/", clientController.listClients);

// Show form to add a new client
router.get("/add", clientController.addClientForm);

// Handle form submission for adding new client
router.post("/add", clientController.addClient);

// Show form to edit a client
router.get("/edit/:id", clientController.editClientForm);

// Handle form submission for editing client
router.post("/edit/:id", clientController.editClient);

// Delete a client
router.post("/delete/:id", clientController.deleteClient);

module.exports = router;
