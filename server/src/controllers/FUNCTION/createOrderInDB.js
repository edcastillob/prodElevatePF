const { Sale } = require("../../db");

async function crearPedidoEnBaseDeDatos(session) {
  try {
    console.log(session);

    // Verificar si session.customer_details existe y tiene la propiedad name
    if (session.shipping.name && session.shipping.name) {
      const pedido = await Sale.create({
        currencyType: session.currency,
        saleType: session.object,
        status: session.status,
        product: ["Banana", "Pera"],
        date: "2023/08/09",
        total: session.amount,

        // Agrega otros campos aquí
      });

      console.log("Pedido creado:", pedido.id);
    } else {
      console.error("No se pudo acceder a session.customer_details.name");
    }
  } catch (error) {
    console.error("Error al crear el pedido:", error);
  }
}

module.exports = { crearPedidoEnBaseDeDatos };
