// Import required modules
const express = require("express");
const path = require("path");
const session = require("express-session"); // Import express-session
const app = express();
const clientRoutes = require("./routes/clients");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
const hbs = require("hbs"); // Import hbs

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Set up view engine and views folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

// Register partials
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For handling JSON body

// Session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true for HTTPS
  })
);

// Routes
app.use("/clients", clientRoutes);
app.use("/admin", adminRoutes); // Admin routes

// Main route
app.get("/", (req, res) => {
  res.render("frontend", { title: "VFC" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
