import React from 'react'

const CategoryFilter = ({ category, onSelect }) => {
    return (
        <div>
            <select name="categorySelect" id="categorySelect" className='form-control' onChange={(e) => onSelect(e.target.value)}>
                <option value="">All Categories</option>
                {category.map(eachCat =>
                    <option key={eachCat.id} value={eachCat.id}>
                        {eachCat.catName}
                    </option>
                )}

            </select>
        </div>
    )
}

export default CategoryFilter