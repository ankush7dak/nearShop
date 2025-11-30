import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setProductList, setLoadingBar} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user from storage
    localStorage.removeItem("user");

    // Clear context
    setProductList([]);
    setLoadingBar(true);

    // Redirect after 1 sec
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}
