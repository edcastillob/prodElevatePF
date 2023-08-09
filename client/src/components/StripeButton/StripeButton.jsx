import axios from "axios";
import { ENDPOINT } from "../../components/endpoint/ENDPOINT";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StripeButton = ({ cartItems }) => {
  const navigate = useNavigate();

  const userActive = useSelector((state) => state.userLog);
  const handledCheckout = () => {
    axios
      .post(`${ENDPOINT}stripe/`, {
        cartItems,
      })
      .then((response) => {
        // console.log(response);
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
      <button
        onClick={() => {
          if (userActive.email) {
            handledCheckout(true);
          } else {
            navigate("/login");
          }
        }}
      >
        Check Out
      </button>
    </>
  );
};

export default StripeButton;
