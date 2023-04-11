import { Route, Routes as Switch } from 'react-router-dom';
import Product from '../screens/Product';
import Products from '../screens/Products';

function Routes() {
  return (
    <Switch>
        <Route path="/" element={<Products/>} />
        <Route path="/products/:id" element={<Product/>} />
    </Switch>
  )
}

export default Routes