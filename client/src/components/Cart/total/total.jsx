import { useState, useEffect } from 'react';
import { useAuth0} from '@auth0/auth0-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useDispatch } from 'react-redux';
import { limpiarCarrito, reinicia_store } from '../../../Redux/actions.js';
import { getAllCategorias, getAllProducts } from '../../../Redux/actions';
import axios from 'axios';
import s from "./Total.module.css";

initMercadoPago('TEST-6150df70-606f-4169-971b-dff2a6c919b6');

export default function Total({ productos, sumatotal, updateCarrito }) {
  const dispatch = useDispatch();
  const [urlPago, setUrlPago] = useState('');
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    const nuevoTotal = productos.reduce((total, producto) => total + producto.subtotalitem, 0);
    updateCarrito(nuevoTotal);
  }, [productos, updateCarrito]);

  const handleCompra = async () => {
    if (isAuthenticated) {
      try {
        const loginuser = user.email; // Utilizar el correo electrónico del usuario autenticado
        const hashvalidacionpago = 'AUN_NO';
        const valortotaloc = productos.reduce((total, producto) => total + producto.subtotalitem, 0);
        console.log('PROBANDO:', valortotaloc, ' .');

        const estadooc = 'pendiente';
        const detalleocx = productos.map((pr) => ({
          idproducto: pr.id,
          nombreproducto: pr.nombre,
          valorunitario: pr.valorunit,
          cant: pr.cantidad,
          subtotal: pr.subtotalitem,
        }));
        const body = { loginuser, hashvalidacionpago, valortotaloc, estadooc, detalleocx };

        console.log('body', body);

        const response = await axios.post('/generar-orden', body);
        const urlPago = response.data.URLo;
        setUrlPago(urlPago);

        // Redireccionar a la URL de Mercado Pago
        window.open(urlPago);
        setTimeout(()=>{
          dispatch(reinicia_store());
          window.location.reload(true);
        },5000)
       
        // Resto de código
        // dispatch(reinicia_store());
        // dispatch(getAllProducts(1));
        // dispatch(getAllCategorias());
      } catch (error) {
        console.error(error);
      }
    } 
  };

  const reiniciaCarro = () => {
    dispatch(reinicia_store());
    window.location.reload(true);
  };

  const redirectToProfile = () => {
    window.location.href = '/profile';
  };

  return (
    
    <div className={s.fondo}>
      <div className={s.titulo}>Sumatoria</div>
      <div className={s.total}>
        <h1>TOTAL</h1>
        <p>${sumatotal ?? 0}</p>
      </div>
      <button className={s.button} onClick={handleCompra}>
        <span>COMPRAR</span>
      </button>
      <button className={s.button} onClick={reiniciaCarro}>
        <span>LIMPIA CARRO</span>
      </button>
 
      <button className={s.button} onClick={redirectToProfile}>
        <span>Ir a Perfil</span>
      </button>
    </div>
  );
}

