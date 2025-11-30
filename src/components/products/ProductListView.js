import { createContext, useContext, useEffect, useState } from "react";
import './ProductListView.css';
import Loading from "../Loading/Loading";

import { UserContext } from "../../contexts/Context";
import ProductCard from "../ProductCard/ProductCard";
import SearchCard from "../SearchCard/SearchCard";
import HamburgerMenu from "../Hamburger/HamburgerMenu";


export default function ProductListView() {
  // const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ price: "", stock: "" });
  const [messages, setMessages] = useState({}); // success / error messages
  const [loadingWhileUpdating,setLoadingWhileUpdating] = useState(false);


  const {productList,
    loadingBar,
    selectedCategory,
    setProductList,
    setSelectedCategory,
    categories} = useContext(UserContext);

  if(loadingBar) return <Loading/>;
  
  console.log(productList);

  // const filteredproductList = productList.filter((p) =>
  //   p.productName.toLowerCase().includes(search.toLowerCase())
  // );
  console.log('check4');
  const filteredproductList = productList.filter((item) => {
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(search.toLowerCase());
  
    const matchesCategory =
      !selectedCategory || item.category.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  console.log('check 5');
  console.log(selectedCategory);

  console.log(filteredproductList);

  

  // Start editing
  const handleEdit = (product) => {
    setEditingId(product.productId);
    setEditValues({ price: product.price, stock: product.stock });
  };

  // Save updated product
  const handleSave = async (id) => {
    setLoadingWhileUpdating(true);
    console.log('check2');
    console.log(id);
    const updatedProduct = { ...editValues };
    console.log(updatedProduct);

    try {
      const res = await fetch(`http://localhost:1616/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        showMessage(id, "Failed to update product", "error");
        return;
      }
console.log('check1')
      // Update UI
      setLoadingWhileUpdating(false);
      setProductList((prev) =>
        prev.map((p) =>
          p.productId === id
            ? { ...p, price: editValues.price, stock: editValues.stock }
            : p
        )
      );

      showMessage(id, "Updated successfully!", "success");
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
      showMessage(id, "Error updating product", "error");
    } 
  };

  // Show success or error message
  const showMessage = (id, text, type) => {
    setMessages((prev) => ({
      ...prev,
      [id]: { text, type },
    }));

    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [id]: null }));
    }, 3000); // hide after 3 sec
  };

  // Increase Stock
  const increaseStock = () => {
    setEditValues((prev) => ({
      ...prev,
      stock: Number(prev.stock) + 1,
    }));
  };

  // Decrease Stock
  const decreaseStock = () => {
    setEditValues((prev) => ({
      ...prev,
      stock: Math.max(0, Number(prev.stock) - 1),
    }));
  };

  return (
    <>
     <HamburgerMenu />

    <SearchCard search={search} setSearch={setSearch} selectedCategory = {selectedCategory} setSelectedCategory = {setSelectedCategory} categories = {categories} filteredproductList = {filteredproductList}/>
    <div className="productList-grid">
      {filteredproductList.map(product => (
        <ProductCard
          key={product.productId}
          product={product}
          editingId={editingId}
          editValues={editValues}
          messages={messages}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
          onValueChange={(field, value)=> setEditValues({ ...editValues, [field]: value })}
          increaseStock={increaseStock}
          decreaseStock={decreaseStock}
          loadingWhileUpdating = {loadingWhileUpdating}
          setLoadingWhileUpdating = {setLoadingWhileUpdating}
        />
      ))}
    </div></>
  );
}