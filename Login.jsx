import { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);

        alert("✅ Login Successful!");

        onLogin();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🔐 Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;