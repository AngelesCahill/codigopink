const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

// Motor de plantilla hbs
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/public/views/partials', function (err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/public/views");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));







app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));
