import axios from "axios";

const StripeButton = ({ cartItems }) => {
  const handledCheckout = () => {
    axios
      .post("http://localhost:3001/stripe/", {
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
