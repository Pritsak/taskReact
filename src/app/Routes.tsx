import React from 'react'
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import Main from '../screens/Main';
import Product from '../screens/Product';
import Products from '../screens/Products';

function Routes() {
  return (
    <Switch>
        <Route path="/" element={<Main/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<Product/>} />
    </Switch>
  )
}

export default Routes