import { createContext, useContext, useEffect, useState } from "react";
import './ProductCard.css';
import Loading from "../Loading/Loading";
import LoadingUpdatingProduct from "../Loading/LoadingUpdatingProduct";

export default function ProductCard({
    product,
    editingId,
    editValues,
    messages,
    onEdit,
    onSave,
    onCancel,
    onValueChange,
    increaseStock,
    decreaseStock,
    setLoadingWhileUpdating,
    loadingWhileUpdating
  }) {
    return (
      <div className="productList-card">
        <h2 className="productList-name">{product.productName}</h2>
  
        <p className="productList-category">
          Category: {product.category?.categoryName}
        </p>
  
        {/* PRICE */}
        {editingId === product.productId ? (
          <input
            type="number"
            className="productList-edit-input"
            value={editValues.price}
            onChange={(e) => onValueChange("price", e.target.value)}
          />
        ) : (
          <p className="productList-price">₹ {product.price}</p>
        )}
  
        {/* STOCK */}

        {(loadingWhileUpdating && editingId === product.productId)?<LoadingUpdatingProduct></LoadingUpdatingProduct>:'' }
        
        {editingId === product.productId ? (
          <div className="productList-stock-edit-section">
            <button className="productList-qty-btn" onClick={decreaseStock}>
              -
            </button>
  
            <input
              type="number"
              className="productList-stock-input"
              value={editValues.stock}
              onChange={(e) => onValueChange("stock", e.target.value)}
            />
  
            <button className="productList-qty-btn" onClick={increaseStock}>
              +
            </button>
          </div>
        ) : (
          <p className="productList-stock">
            Stock Left: <span>{product.stock}</span>
          </p>
        )}
  
        <p className="productList-shop-name">
          Shop: {product.shop?.shopName}
        </p>
  
        {/* MESSAGES */}
        {messages[product.productId] && (
          <p
            className={
              messages[product.productId].type === "success"
                ? "productList-msg-success"
                : "productList-msg-error"
            }
          >
            {messages[product.productId].text}
          </p>
        )}
  
        {/* BUTTONS */}
        {}
        {editingId === product.productId ? (
          <div className="productList-edit-actions">
            <button
              className="productList-save-btn"
              onClick={() => onSave(product.productId)}
            >
              Save
            </button>
            <button className="productList-cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="productList-update-btn"
            onClick={() => onEdit(product)}
          >
            Update
          </button>
        )}
      </div>
    );
  }
  