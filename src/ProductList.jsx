
const ProductList = ({ products }) => {
    return (
        <div className='row'>
            {products.map((product) =>
                <div className='col-lg-4 col-md-6 col-sm-12 mb-4' key={product.id}>
                    <div className='card h-100'>
                        <img src={product.imageUrl} className='card-img-top' alt={product.name} />
                        <div class="card-body">
                            <h5 class="card-title">{product.name}</h5>
                            <p class="card-text">{product.description}</p>
                            <p class="card-text"><strong>${product.price}</strong></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductList