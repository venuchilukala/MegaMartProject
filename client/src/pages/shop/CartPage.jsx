import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Calculate Price
  const calculatePrice = (item) => {
    // return item.price * item.quantity
  };

  // Calculate total price
  const calculateSubTotal = cartItems.reduce((total, item)=>{
    // return total + calculatePrice(item)
  },0)

  // handleIncrease
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${"45521"}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
    refetch();
  };

  // handleDecrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${"45521"}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updatedCart);
        });
      refetch();
    } else {
      alert("Item can't be lessthan zero");
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/${"jskdj"}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="section-container">
      <div className="min-h-screen  xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-14 flex flex-col items-center justify-center gap-8">
          <div className="px-4 space-y-7">
            <h2 className="md:text-4xl font-bold md:leading-snug leading-snug">
              Items in the Cart
            </h2>
          </div>
        </div>

        {/* Cart table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>Name of product</td>
                <td>$0{calculatePrice("item").toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDecrease("item")}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value="0"
                    onChange={() => console.log("object")}
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-xs"
                    onClick={() => handleIncrease("item")}
                  >
                    +
                  </button>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-sm text-red-500"
                    onClick={() => handleDelete("item")}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            </tbody>
            {/* foot */}
          </table>
        </div>

        {/* customer details */}
        <div className="my-12 flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-1/2 space-y-3">
            <h3 className="font-medium">Customer Details</h3>
            <p>Name : {user.displayName}</p>
            <p>Email : {user.email}</p>
            <p>User id : {user.uid}</p>
          </div>
          <div>
            <h3 className="font-medium">Shopping Details</h3>
            <p>Total Items : {cart.length}</p>
            <p>Total Price : 200.00</p>
            <button className="btn btn-md btn-primary text-white">
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
