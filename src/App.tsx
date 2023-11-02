import { Route, Routes } from "react-router-dom";
import Home from "./controler/home/Home";

import { ProductList } from "./controler/productlist/ProductList";
import ProductDetail from "./controler/productdetail/ProductDetail";
import { Projection } from "./controler/projection/Projection";
import { MovieSearch } from "./controler/search/MovieSearch";
import { Home as HomeAdmin } from "./controler/admin/home/Home";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movieall' element={<ProductList />} />
        <Route path='/moviedetail' element={<ProductDetail />} />
        <Route path='/projection' element={<Projection />} />
        <Route path='/search' element={<MovieSearch />} />
        <Route path='/homeadmin' element={<HomeAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
