import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart(); // Assume this fetches { products: [{ id, quantity }], email }
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]); // To store enriched product details

  console.log(cartItems);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await Promise.all(
        cart.products.map(async (item) => {
          const res = await fetch(
            `http://localhost:6001/products/${item.product}`
          );
          const productData = await res.json();
          return {
            ...productData, // Add fetched product details
            quantity: item.quantity, // Include quantity from the cart
          };
        })
      );
      setCartItems(productDetails);
    };

    if (cart.products) {
      fetchProductDetails();
    }
  }, [cart]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const calculateSubTotal = cartItems.reduce(
    (total, item) => total + calculatePrice(item),
    0
  );

  const handleIncrease = async (item) => {
    try {
      const updatedQty = {
        productId: item._id,
        quantity: -1,
        email: cart.email,
      };
      console.log("Clicked prod", updatedQty);
      await fetch(`http://localhost:6001/carts?email=${cart.email}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(updatedQty),
      });

      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      refetch();
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    // console.log(item);
    if (item.quantity > 1) {
      try {
        const updatedQty = {
          productId: item._id,
          quantity: -1,
          email: cart.email,
        };
        console.log("Clicked prod", updatedQty);

        await fetch(`http://localhost:6001/carts?email=${cart.email}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(updatedQty),
        });

        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        setCartItems(updatedCart);
        refetch();
      } catch (error) {
        console.error("Error decreasing item quantity:", error);
      }
    } else {
      alert("Item quantity can't be less than 1");
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:6001/carts/${item.id}`, {
            method: "DELETE",
          });

          const data = await res.json();
          if (data.deletedCount > 0) {
            const updatedCart = cartItems.filter(
              (cartItem) => cartItem.id !== item.id
            );
            setCartItems(updatedCart);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  return (
    <div className="section-container">
      <div className="min-h-screen xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-14 flex flex-col items-center justify-center gap-8">
          <div className="px-4 space-y-7">
            <h2 className="md:text-4xl font-bold md:leading-snug leading-snug">
              Items in the Cart
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
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
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.imageUrl} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${calculatePrice(item).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="w-10 mx-2 text-center"
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-12 flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-1/2 space-y-3">
            <h3 className="font-medium">Customer Details</h3>
            <p>Name : {user.displayName || user.name}</p>
            <p>Email : {user.email}</p>
            <p>User ID : {user.uid}</p>
          </div>
          <div>
            <h3 className="font-medium">Shopping Details</h3>
            <p>Total Items : {cartItems.length || 0}</p>
            <p>Total Price : ${calculateSubTotal.toFixed(2)}</p>
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
