const express = require("express");
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const Contact = require("./models/contactdata");
const port = process.env.PORT || 3000;

const app = express();

// setting a path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

// middlewares
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/ css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));


app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/service", (req, res) => {
    res.render("service")
});

app.get("/gallery", (req, res) => {
    res.render("gallery")
});

app.get("/contact", (req, res) => {
    res.render("contact")
});


app.post("/contact",async(req, res) => {
    try {
        const contactDetails = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })
        const registeredData = await contactDetails.save();
        res.status(201).render("index");
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port,() => {
    console.log(`Server is running on the port no ${port}`);
})
