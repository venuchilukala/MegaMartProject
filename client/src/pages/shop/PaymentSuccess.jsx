import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user information is stored here
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const clearCart = async () => {
      if (user?.email) {
        try {
          // Step 1: Get the cart using the user's email
          const cartResponse = await axiosSecure.get(`/carts?email=${user.email}`);

          // Check if the response was successful
          if (cartResponse.status === 200 && cartResponse.data) {
            const cartData = cartResponse.data;

            if (cartData && cartData._id) {
              // Step 2: Send the cart ID to clear the cart
              const deleteResponse = await axiosSecure.delete(`/carts/clear-cart/${cartData._id}`);

              if (deleteResponse.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Payment Successful",
                  text: "Your cart has been cleared.",
                  timer: 3000,
                });
                navigate("/"); // Redirect to home or another page
              } else {
                console.error("Failed to clear cart:", deleteResponse.data);
              }
            } else {
              console.error("Cart not found.");
            }
          } else {
            console.error("Failed to fetch cart:", cartResponse.data);
          }
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }
    };

    clearCart();
  }, [user, navigate, axiosSecure]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Thank you for your purchase!</h1>
      <p>Your payment was successful.</p>
    </div>
  );
};

export default PaymentSuccess;
