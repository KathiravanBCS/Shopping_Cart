import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {EcommerceLogin} from './Components/EcommerceLogin';
import {ShoppingCart} from './Components/ShoppingCart';
import {CheckOut} from './Components/CheckOut';
import  {OrderSummary}  from './Components/OrderSummery';   

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Shopping_Cart/" element={<EcommerceLogin />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
  