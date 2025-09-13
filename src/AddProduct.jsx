import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_API_PROD_URL
    const key = import.meta.env.VITE_API_FILE
    useEffect(() => {

        fetch(baseUrl + '/api/categories')
            .then(response => response.json())
            .then(data => setCategory(data))
    }, [])

    console.log(category)

    // Handle text/number/dropdown inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // On submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formCategory = category.find((eachCat) => eachCat.id === parseInt(formData.category))
        if (!formCategory) {
            return;
        }
        console.log(formCategory)
        const urlImage = await uploadImage();
        // Create product object
        const product = {
            id: 0,
            prodName: formData.name,
            prodDesc: formData.description,
            price: parseFloat(formData.price),
            categoryDto: formCategory,
            imageUrl: urlImage,
        };

        console.log("Submitted product:", product);
        if (urlImage) {
            try {
                const res = await fetch(baseUrl + '/api/products', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product)
                })
                const data = await res.json();
                if (res.ok) {
                    console.log(data)
                    e.target.reset()
                    navigate('/')
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const uploadImage = async () => {
        const data = new FormData()
        data.append('file', formData.image);
        data.append('upload_preset', key)
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/brendanxure/image/upload', {
                method: 'post',
                body: data
            })
            const urlData = await res.json();
            console.log(urlData.secure_url)
            return urlData.secure_url;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container' style={{ minWidth: "700px" }}>
            <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
                {/* Product Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Price */}
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                        className="form-control"
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {category.map(eachCat => <option key={eachCat?.id} value={eachCat?.id}>{eachCat.catName}</option>)}
                    </select>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddProduct