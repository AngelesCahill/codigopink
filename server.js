const express = require("express");
const app = express();
const routes = require("./app/routes/routes.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const util = require("util");
const sign = util.promisify(jwt.sign);
const verifyToken = require("./app/middlewares/auth.js");
const PORT = process.env.PORT;

// Motor de plantilla hbs
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/public/views/partials', function (err) {});
app.set('view engine', 'hbs');
app.set("views", __dirname + "/public/views");

app.use(express.static(__dirname + "/public"));

//app.get("/aboutme", verifyToken);

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/aboutme", (req, res) => {
  res.render("about");
});
app.get("/interest", (req, res) => {
  res.render("interest");
});


// Login
// method: POST
// url: http://localhost:3000/api/login

app.post("/login", async (req, res) => {
  // lógica del inicio de sesión
  try {
    const { nombre, email } = req.body;

    // Validar los datos de entrada
    if (!(nombre && email)) {
      res
        .status(400)
        .json({ message: "Todos los datos son requeridos, nombre y mail" });
      return;
    }

    // Utilizamos un usuario prefijado, no por bbdd previamente importado en User
    if (User.nombre === nombre && User.email === email) {
      // Se genera el Token
      const token = await sign(
        {
          nombre,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2m",
        }
      );
      // Impresion por el terminal del Token generado para el usuario
      console.log("Usuario: " + email + "\nToken: " + token);

      // Retornando los datos del usuario
      res.status(200).json({
        token,
        message: "Autenticado",
      });
      return;
    }
    res.status(401).json({ message: "Credenciales invalidas" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));







app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));
