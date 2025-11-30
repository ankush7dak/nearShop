import './SearchCard.css';

export default function SearchCard({ search, setSearch ,selectedCategory,setSelectedCategory,categories,filteredProductList}) {
    return (
        <div className="search-category-container">
        {/* Search Bar */}
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {setSearch(e.target.value);}}
        />
      
        {/* Category Dropdown */}
        <select
          className="category-dropdown"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
      
          {categories?.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
      
    );
  }
  