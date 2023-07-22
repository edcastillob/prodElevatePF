import React from "react";

import { Link } from "react-router-dom";

export default function Mensaje() {
  return (
    <div className='mensajito'>
      <h1>Tu carrito está vacío</h1>
      <p>
        ¿No sabés qué comprar? ¡Miles de productos te esperan nuestra pagina!
      </p>
      <Link to={"/home"}>
        <button>Explorar Mas</button>
      </Link>
    </div>
  );
}
