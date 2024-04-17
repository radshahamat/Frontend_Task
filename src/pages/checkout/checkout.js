import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

const Checkout = ({cart,setCart}) => {


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await localforage.getItem('cart');
        if (cartData) {
          setCart(cartData);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const handleUpdateQuantity = (productId, quantity) => {
    const updatedCart = { ...cart };
    updatedCart[productId].quantity = quantity;
    setCart(updatedCart);
    localforage.setItem('cart', updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = { ...cart };
    delete updatedCart[productId];
    setCart(updatedCart);
    localforage.setItem('cart', updatedCart);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (const productId in cart) {
      totalPrice += cart[productId].quantity * cart[productId].price;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div>
        {Object.keys(cart).map((productId) => (
          <div key={productId} className="border-b border-gray-200 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{cart[productId].title}</h2>
              <p className="text-gray-600">${(cart[productId].price).toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleUpdateQuantity(productId, cart[productId].quantity - 1)}
                disabled={cart[productId].quantity === 1}
                className="bg-blue-500 text-white px-2 py-1 rounded-l"
              >
                -
              </button>
              <span className="px-4">{cart[productId].quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(productId, cart[productId].quantity + 1)}
                className="bg-blue-500 text-white px-2 py-1 rounded-r"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(productId)}
                className="ml-4 text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total: ${getTotalPrice()}</h2>
      </div>
    </div>
  );
};

export default Checkout;
