const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const session = require("express-session");
const { User } = require("./db");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const bodyParser = require("body-parser");

// // Socket Server - P1
// const http = require('http');
// const { Server } = require('socket.io');

const server = express();
server.use(bodyParser.json({ limit: "3mb" }));
server.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));

// Configuracion de la estrategia local de Passport
passport.use(
  new Strategy(function (username, password, done) {
    console.log(username);
    User.findOne({
      where: { email: username }, // Modificamos el campo para buscar por email en lugar de name
    })
      .then((user) => {
        if (!user) {
          console.log("Usuario no encontrado:", username);
          return done(null, false); // Autenticación no exitosa
        }
        if (user.password !== password) {
          console.log("Contraseña incorrecta para el usuario:", username);
          return done(null, false); // Autenticación no exitosa
        }
        console.log("Usuario autenticado:", user);
        return done(null, user); // Autenticación exitosa
      })
      .catch((error) => {
        console.log("Error al buscar usuario:", error);
        return done(error); // Error
      });
  })
);

// Configuracion de la persistencia de la sesion autenticada
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
});

// Configuracion del view engine para renderizar templates de EJS
server.set("views", __dirname + "/views");
server.set("view engine", "ejs");

server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

// Configuración de la sesión con express-session
server.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

// Inicializa passport y recupera el estado de autenticacion de la sesion
server.use(passport.initialize());
server.use(passport.session());

// Configuracion de la estrategia local de Passport
passport.use(
  new Strategy(function (username, password, done) {
    User.findOne({
      where: { email: username },
    })
      .then((user) => {
        if (!user) {
          return done(null, false); // Autenticacion no exitosa
        }
        if (user.password !== password) {
          return done(null, false); // Autenticacion no exitosa
        }
        return done(null, user); // Autenticacion exitosa
      })
      .catch((error) => {
        return done(error); // Error
      });
  })
);

// Configuracion de la persistencia de la sesion autenticada
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
});

// server.set('views', __dirname + '/views');
// server.set('view engine', 'ejs');

server.use(router);

// // Configurando el Socket Server - P2
// const serverNode = http.createServer(server);
// const io = new Server(serverNode);

// // Conexion socket con frontend
// io.on('connection', socket => {
//   console.log(socket.id, 'Client id')

//   socket.on('chat', (body) => {
//     console.log(body, 'chat')
//     socket.broadcast.emit('message', {
//       body,
//       from: socket.id.slice(6)
//     })
//   })
// })

module.exports = server;
