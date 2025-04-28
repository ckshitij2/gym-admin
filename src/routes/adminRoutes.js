const express = require("express");
const router = express.Router();

// Dummy admin credentials for demonstration
const ADMIN_CREDENTIALS = {
  username: "aa", // Replace with your actual credentials or database lookup
  password: "aa",
};

// Handle the POST request for admin login
router.post("/authenticatecreds", (req, res) => {
  const { username, password } = req.body;

  // Example login validation
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    // Set session data (logged-in state)
    req.session.isAdmin = true; // Mark as logged in
    req.session.username = username; // Store username or other details

    // Redirect to the admin dashboard after successful login
    return res.redirect("/admin/dashboard");
  }

  // If the credentials are incorrect, render the error page with the error message
  return res.render("error", {
    title: "Admin Login Error",
    error: "Invalid username or password.",
  });
});

// Admin dashboard route (protected)
router.get("/dashboard", (req, res) => {
  // Check if the admin is logged in by checking session data
  if (!req.session.isAdmin) {
    return res.redirect("/"); // Redirect to login if not logged in
  }

  // If logged in, render the dashboard
  res.render("home", {
    title: "Admin Dashboard",
    currentPage: "dashboard",
    username: req.session.username,
    activeClients: 120,
    newRegistrations: 15,
    totalRevenue: 50000,
    pendingEnquiries: 8,
  });
});

// Admin dashboard route (protected)
router.get("/clientDashboard", (req, res) => {
  // Check if the admin is logged in by checking session data
  if (!req.session.isAdmin) {
    return res.redirect("/"); // Redirect to login if not logged in
  }

  // If logged in, render the dashboard
  res.render("clientPanel", {
    title: "Client Management Dashboard",
    username: req.session.username,
    currentPage: "clientDashboard",
    activeClients: 120,
    newRegistrations: 15,
    totalRevenue: 50000,
    pendingEnquiries: 8,
  });
});

// Logout route (to clear session)
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/admin/dashboard");
    }
    res.redirect("/"); // Redirect to home page after logging out
  });
});

module.exports = router;
