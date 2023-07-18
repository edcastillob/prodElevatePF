import React from "react";
// import { useStripe, useElements, CardElement, Elements, StripeProvider } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import styles from "./Cart.module.css";
import exampleImg from "../../assets/notebook samsung.png"

 


 export const Cart = () => {
    // const stripePromise = loadStripe("publish_key");
    // const stripe = useStripe();
    // const elements = useElements();


    const products = [
        {
            id: 1,
            category: "technology",
            name: "Notebook Samsung",
            price: 150,
            image: exampleImg,
            stock: 25
        }
    ]

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: "card",
    //         card: elements.getElement(CardElement)
    //     });
    
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(paymentMethod);
    //         // Enviar el token de pago al servidor y procesar la transacción.
    //     }
    // }

    return (
        <div className={styles.divContainer}>
         {/* <StripeProvider stripe={stripePromise}>
         <Elements stripe={stripe}> */}
         <div className={styles.divForm}>
             <form >
                <div className={styles.FormIn}>
                <h3>{products[0].name}</h3>
                <img src={products[0].image} alt={products[0].name} />
                <p>Price: {products[0].price} USD</p>
                <button className={styles.submitButton} type="submit">Buy</button>
                </div>
                {/* <CardElement /> */}
             </form> 
         {/* </Elements>
         </StripeProvider> */}
         </div>
        </div>
    )
}
