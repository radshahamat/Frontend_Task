import { Routes, Route } from 'react-router-dom';

// HEADER
import Header from "./header";
// PAGES
import Dashboard from "./pages/dashboard/dashboard";
import Details from "./pages/details/details";
import Checkout from "./pages/checkout/checkout";
import { useEffect, useState } from 'react';
import localforage from 'localforage';



function App() {

  const [cart, setCart] = useState({})

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
  return (
      <main>
        <Header cart={cart} setCart={setCart} />
        <Routes>
          <Route index path="/" element={<Dashboard cart={cart} setCart={setCart} />} />
          <Route path="checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="details/:id" element={<Details />} />
        </Routes>

      </main>

  );
}

export default App;