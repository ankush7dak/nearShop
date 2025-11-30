import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import "./hamburger.css"; // IMPORTANT: add CSS file

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "My Products", to: "/products" },
    { label: "Add Product", to: "/add-product" },
    { label: "Customers", to: "/customers" },
    { label: "Orders", to: "/orders" },
    { label: "Payments", to: "/payments" },
    { label: "Reports", to: "/reports" },
    { label: "Subscription", to: "/subscription" },
    { label: "Shop Details", to: "/shop" },
    { label: "Profile", to: "/profile" },
    { label: "Logout", to: "/Logout" },
  ];

  return (
    <div>
      <button className="ham-btn" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`side-menu ${open ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Shop Menu</h2>
          <button onClick={() => setOpen(false)} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}
