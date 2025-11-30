import "./addProduct.css";
import { useState, useEffect } from "react";
import HamburgerMenu from "../../Hamburger/HamburgerMenu";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [ categoryId,setCategoryId] = useState('');

  const [previewImage, setPreviewImage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle image preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };


  //handling saving new product
  const handleAddNewProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productName", e.target.productName.value);
    formData.append("productPrice", e.target.productPrice.value);
    formData.append("productStock", e.target.productStock.value);
    formData.append("productDescription", e.target.productDescription.value);
    formData.append("productImage", e.target.productImage.files[0]);
    formData.append("shopId", user.shopId);
    formData.append("categoryId", categoryId);

    try{
      const res = await fetch("http://localhost:1616/api/products/addNewProduct",{
        method : "POST",
        body : formData
      });

      console.log('i am here');
      if (res.ok) {
        alert("Category added successfully!");
      } else {
        const msg = await res.text();
        alert(msg);
      }

    } catch(err){
      console.error("Error:", err);

    }
  };



  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost:1616/api/categories/shop-id/${user.shopId}`);
      const data = await res.json();
      setCategories(data);
      console.log('i am here 44 ',categories);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Save New Category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await fetch("http://localhost:1616/api/categories/addNewProduct", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryName: newCategory
            .toLowerCase()
            .split(" ")
            .filter((word) => word.trim() !== "")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          shopId: user.shopId,
        }),
      });

      if (res.ok) {
        alert("Category added successfully!");
      } else {
        const msg = await res.text();
        alert(msg);
      }

      setNewCategory("");
      setShowAddCategory(false);
      fetchCategories();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <HamburgerMenu />
      <div className="add-product-container">
        <div className="add-product-card">
          <h2 className="add-product-title">Add New Product</h2>

          {/* ⭐ FIXED: onSubmit added here */}
          <form className="form-area" onSubmit={handleAddNewProduct}>

            {/* CATEGORY */}
            <div className="form-group">
              <label className="label">
                Product Category <span className="required">*</span>
              </label>

              <div className="category-row">
                <select
                  className="input-select"
                  onChange={(e) => {
                    setCategoryId(Number(e.target.value));
                    console.log('iam here 20' + e.target.value);
                  }}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option  value={c.categoryId} >
                      {c.categoryName}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="add-btn"
                  onClick={() => setShowAddCategory(true)}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* PRODUCT NAME */}
            <div className="form-group">
              <label className="label">
                Product Name <span className="required">*</span>
              </label>
              <input
                className="input"
                placeholder="Enter product name"
                name="productName"
                required
              />
            </div>

            {/* PRICE & STOCK */}
            <div className="price-stock-row">
              <div className="form-group">
                <label className="label">
                  Price (₹) <span className="required">*</span>
                </label>
                <input type="number" className="input" required name="productPrice" />
              </div>

              <div className="form-group">
                <label className="label">
                  Stock <span className="required">*</span>
                </label>
                <input type="number" className="input" required name="productStock" />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label className="label">Description (Optional)</label>
              <textarea className="textarea" rows={3} name="productDescription"></textarea>
            </div>

            {/* IMAGE UPLOAD + PREVIEW */}
            <div className="form-group">
              <label className="label">
                Product Image <span className="required">*</span>
              </label>

              {/* ⭐ FIXED: Added name="productImage" */}
              <input
                type="file"
                accept="image/*"
                className="file-input"
                name="productImage"
                onChange={handleImagePreview}
                required
              />

              {previewImage && (
                <div className="image-preview-area">
                  <img src={previewImage} alt="" className="preview-img" />

                  <button
                    type="button"
                    className="remove-img-btn"
                    onClick={() => setPreviewImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="submit-area">
              {/* ⭐ FIXED: removed onClick */}
              <button className="submit-btn" type="submit">
                Add Product
              </button>
            </div>

          </form>
        </div>

        {/* ADD CATEGORY MODAL */}
        {showAddCategory && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Add New Category</h3>

              <input
                type="text"
                className="input"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowAddCategory(false)}>
                  Cancel
                </button>

                <button className="save-btn" onClick={handleAddCategory}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
