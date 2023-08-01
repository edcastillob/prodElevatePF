import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";

const StripeButton = ({ cartItems }) => {
  const handledCheckout = () => {
    axios
      .post(`${ENDPOINT}stripe/`, {
        cartItems,
      })
      .then((response) => {
        console.log(response);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handledCheckout}>Check Out</button>
    </>
  );
};

export default StripeButton;
