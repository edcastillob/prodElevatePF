const Stripe = require("stripe");
require("dotenv").config();

const { STRIPE_KEY, YOUR_DOMAIN } = process.env;

const stripe = Stripe(STRIPE_KEY);

async function postStripe(req, res) {
  try {
    //console.log(req.body.cartItems);
    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.images,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.salePrice * 100,
        },
        quantity: item.cartQuantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "DO"],
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/home`,
      cancel_url: `${YOUR_DOMAIN}/cart`,
    });

    res.send({ url: session.url });
    //console.log(session);
  } catch (error) {
    res.send({ error: error.message });
  }
}

module.exports = { postStripe };
