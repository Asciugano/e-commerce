import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/navbar'
import { HomePage } from './pages/home_page'
import RegisterPage from './pages/auth/register_page'
import LoginPage from './pages/auth/login_page'
import OrderPage from './pages/order_page'
import ProductsPage from './pages/products_page'
import UserPage from './pages/user_page'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/register'
          element={<RegisterPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/orders'
          element={<OrderPage />}
        />
        <Route
          path='/products'
          element={<ProductsPage />}
        />
        <Route
          path='/user'
          element={<UserPage />}
        />
      </Routes>
    </div>
  )
}

export default App
