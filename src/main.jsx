import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddProduct from './AddProduct.jsx';
import Navbar from './Navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div><Navbar /></div>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/add' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
