// middleware/passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const { User } = require('../db/models'); // Asegúrate de ajustar la ruta correcta a tu modelo User
const { User } = require('../db'); // Ajusta la ruta según la ubicación real de tu modelo User

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user', // Nombre del campo que contiene el correo electrónico en la solicitud
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { email: username } });

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
