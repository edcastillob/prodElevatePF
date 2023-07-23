const loginJS = (req, res) => {
  // Si llega a esta parte, significa que el usuario fue autenticado correctamente
  // y el usuario se encuentra en req.user
  const user = req.user;
  console.log("Usuario autenticado:", user.dataValues);

  try {
    // Aquí debes realizar cualquier acción adicional que necesites hacer después del inicio de sesión exitoso.
    // Por ejemplo, puedes generar y devolver un token JWT si estás utilizando autenticación basada en tokens.

    // Luego, puedes enviar la respuesta al cliente con los datos del usuario autenticado
    return res.status(200).json({
      success: true,
      user: user.dataValues,
    });
  } catch (error) {
    console.error("Error en loginJS:", error);
    // Si ocurre algún error, envía una respuesta de error al cliente.
    // Puedes devolver un mensaje de error específico o simplemente un estado de error con un mensaje general.
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error en el servidor al procesar la solicitud.",
    });
  }
};

// Agrega esta función en tu archivo donde manejas las rutas (router.js o similar)
const logout = (req, res) => {
  try {
    // La función logout se puede acceder desde el objeto `req`, ya que se configuró al usar `passport.session()`.
    req.logout();

    // Puedes realizar cualquier acción adicional que necesites después del cierre de sesión aquí.

    // Devuelve una respuesta exitosa al cliente para indicar que el usuario ha cerrado sesión correctamente.
    return res.status(200).json({
      success: true,
      message: "Cierre de sesión exitoso.",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    // Si ocurre algún error, envía una respuesta de error al cliente.
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error en el servidor al cerrar sesión.",
    });
  }
};

module.exports = {
  loginJS,
  logout,
};

