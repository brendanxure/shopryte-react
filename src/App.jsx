import { useEffect, useState } from 'react'
import './App.css'
import ProductList from './ProductList'
import CategoryFilter from './CategoryFilter'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")

  console.log(products)

  const baseUrl = import.meta.env.VITE_API_PROD_URL
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

  const handleCategory = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null)
  }

  const filteredProducts = products.filter(product => {
    return ((selectedCategory ? product.categoryDto.id === selectedCategory : true)
      && product?.prodName?.toLowerCase().includes(searchTerm?.toLowerCase()))
  }).sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  console.log(filteredProducts)

  return (
    <div className='container-fluid'>
      <h1 className='my-4'>Product Catalog</h1>
      <div className='row align-items-center mb-4'>
        <div className='col-md-3 col-sm-12 mb-2'>
          <CategoryFilter category={category} onSelect={handleCategory} />
        </div>
        <div className='col-md-5 col-sm-12 mb-2'>
          <input type="text" className='form-control' placeholder='Search for products' onChange={handleSearch} name="" id="" />

        </div>
        <div className='col-md-4 col-sm-12 mb-2'>
          <select name="sort-select" id="sort-select" className='form-control' onChange={handleSort}>
            <option value="asc"> Sort by Price: Low to High </option>
            <option value="desc"> Sort by Price: High to Low </option>
          </select>
        </div>
      </div>
      <div>
        {filteredProducts.length ? (<ProductList products={filteredProducts} />) : (<p>...loading please wait</p>)}
      </div>
    </div>
  )
}

export default App
