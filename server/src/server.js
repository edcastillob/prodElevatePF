const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const session = require("express-session");
const path = require("path");
const { User } = require("./db");



const server = express();

// Configuracion del view engine para renderizar templates de EJS
// server.use(express.static(path.join(__dirname, 'client')));

server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

// Configuración de la sesión con express-session
server.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
    );
    
    // Inicializa passport y recupera el estado de autenticacion de la sesion
    server.use(passport.initialize());
    server.use(passport.session());
    
    // Configuracion de la estrategia local de Passport
    passport.use(new Strategy(
        function(username, password, done) {
            User.findOne({
                where: { name: username }
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
        }
        ));
        
        // Configuracion de la persistencia de la sesion autenticada
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        
        passport.deserializeUser(function(id, done) {
            User.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                return done(error);
                });
        });

        server.set('views', __dirname + '/views');
        server.set('view engine', 'ejs');
        
        server.use(router);

module.exports = server;
