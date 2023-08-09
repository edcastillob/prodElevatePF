const Stripe = require("stripe");
const { crearPedidoEnBaseDeDatos } = require("../FUNCTION/createOrderInDB");
require("dotenv").config();

const stripe = Stripe(
  "sk_test_51NSJ3mCTMUVMB2lNSo9Zfos5FW7qJEqXjlfvb0P81YjC8pWe7nhyGY4yr44sYJrkZ0J2c1V98t0j2LsMKpIbGbmR00aq1MWGRZ"
);

async function postStripeWebhook(req, res) {
  const event = req.body;

  // Manejar diferentes tipos de eventos (por ejemplo, 'payment_intent.succeeded')
  if (event.type === "payment_intent.succeeded") {
    const paymentIntentId = event.data.object.id;

    // Obtener detalles del pago desde Stripe
    stripe.paymentIntents.retrieve(paymentIntentId, (err, paymentIntent) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }

      // Procesar el objeto de pago y crear un pedido en la base de datos
      crearPedidoEnBaseDeDatos(paymentIntent);
      res.status(200).end();
    });
  } else {
    res.status(200).end();
  }
}

module.exports = { postStripeWebhook };
