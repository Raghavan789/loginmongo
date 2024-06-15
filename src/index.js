const express = require("express");
const app = express();
const path = require("path");

// Set the path for EJS templates
const templatePath = path.join(__dirname, '../templates');

// Middleware to parse JSON requests
app.use(express.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", templatePath);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// Route for the home page
app.get('/', (req, res) => {
    res.render("login");
});

// Route for the signup page
app.get('/signup', (req, res) => {
    res.render("signup");
});
