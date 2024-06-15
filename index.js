const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb");
const bodyParser = require("body-parser");

// Set the path for EJS templates
const templatePath = path.join(__dirname, 'src', 'templates');

// Middleware to parse JSON requests and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", templatePath);

// Route for the home page
app.get('/', (req, res) => {
    res.render("login");
});

// Route for the signup page
app.get('/signup', (req, res) => {
    res.render("signup");
});

// Handle login requests
app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await collection.findOne({ name, password });
        if (user) {
            res.render("home");
        } else {
            res.render("login", { error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Handle signup requests
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        await collection.insertMany([data]);
        res.render("home");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
