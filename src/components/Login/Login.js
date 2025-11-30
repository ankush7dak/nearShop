import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password
    };

    try {
      const res = await fetch("http://localhost:1616/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();

        // Save user details in localStorage for MyShop
        console.log(email);
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));

        setMsg(`Welcome ${data.userId} | Shop: ${data.shopId} | Role: ${data.role}`);
        navigate("/dashboard");
      } else {
        setMsg("Invalid login details");
      }
    } catch (err) {
      setMsg("Backend not reachable");
    }
  };

  return (
        <div style={styles.container}>
      <h2>MyShop Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button}>Login</button>
      </form>

      {msg && <p style={styles.msg}>{msg}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "120px auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ccc",
    textAlign: "center",
    background: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px"
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #aaa",
    borderRadius: "6px"
  },
  button: {
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  msg: {
    marginTop: "15px",
    fontWeight: "bold"
  }
};

export default Login;
