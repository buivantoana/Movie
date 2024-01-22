import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Home as HomeAdmin } from './component/admin/home/Home'
import { Albums } from './component/album/Albums'
import Home from './component/home/Home'
import ProductDetail from './component/productdetail/ProductDetail'
import { ProductList } from './component/productlist/ProductList'
import { Projection } from './component/projection/Projection'
import { MovieSearch } from './component/search/MovieSearch'
import { dataGender } from './redux/action/actionGender'
import { authenticateUser } from './redux/action/actionLoginReduxThunk'
import { dataupComming } from './redux/action/actionUpcoming'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  let dispath = useDispatch<any>()
  useEffect(() => {
    dispath(dataGender())
    dispath(dataupComming())
    dispath(authenticateUser())
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movieall' element={<ProductList />} />
        <Route path='/moviedetail' element={<ProductDetail />} />
        <Route path='/projection' element={<Projection />} />
        <Route path='/search' element={<MovieSearch />} />
        <Route path='/homeadmin' element={<HomeAdmin />} />
        <Route path='/albums' element={<Albums />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default App
