import { createContext, useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loadingBar, setLoadingBar] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  //Fetch categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const value = {
    productList,
    setProductList,
    categories,
    setCategories,
    loadingBar,
    setLoadingBar,
    selectedCategory,
    setSelectedCategory
  };
  
  // Fetch categories also
  useEffect(() => {
    fetch(`http://localhost:1616/api/categories/shop-id/${user.shopId}`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Category Error:", err));
  }, []);




    // Fetch products
    useEffect(() => {
      if (!user) return;
    
      const load = async () => {
        setLoadingBar(true);
        const res = await fetch(
          `http://localhost:1616/api/products/shop-id/${user.shopId}`
        );
        const data = await res.json();
        setProductList(data);
        console.log('20');
        console.log(productList);
        setLoadingBar(false);
      };
    
      load();
    }, []);  // Only run when user is updated after login
    
  // if(loadingBar) return <Loading/>;

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}
