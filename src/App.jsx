import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './ProductList'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")

  console.log(products)
  console.log(category)

  const baseUrl = 'http://localhost:8080'
  useEffect(() => {
    fetch(baseUrl + '/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))

    fetch(baseUrl + '/api/categories')
      .then(response => response.json())
      .then(data => setCategory(data))
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (event) => {
    setSortOrder(event.target.value)
  }

  return (
    <div className='container'>
      <h1 className='my-4'>Product Catalog</h1>
      <div className='row align-items-center mb-4'>
        <div className='col-md-3 col-sm-12 mb-2'>
          <p>Category Filter</p>
        </div>
        <div className='col-md-5 col-sm-12 mb-2'>
          <input type="text" className='form-control' placeholder='Search for products' onChange={handleSearch} name="" id="" />

        </div>
        <div className='col-md-4 col-sm-12 mb-2'>
          <select name="" id="" className='form-control' onChange={handleSort}>
            <option value="asc"> Sort by Price: Low to High </option>
            <option value="desc"> Sort by Price: High to Low </option>
          </select>
        </div>
      </div>
      <div>
        {products.length ? (<ProductList products={products} />) : (<p>No product found</p>)}
      </div>
    </div>
  )
}

export default App
