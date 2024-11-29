import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Initialize Stripe with your publishable key
  const stripePromise = loadStripe('pk_test_51QNc3EFJ0c8DdCgACd2q1dEF37iHbkEkGznIZ0Ab4cacS3W6wrMYZ7uZOs6VeY1bpVhmgTp9KTLFqHyLhAPj1i7E00V0WKH6mD');

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          {/* Wrap PlaceOrder with Elements */}
          <Route
            path='/order'
            element={
              <Elements stripe={stripePromise}>
                <PlaceOrder />
              </Elements>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
