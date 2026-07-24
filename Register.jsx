import { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration Successful!");
        console.log(data);

        setUser({
          name: "",
          email: "",
          password: "",
        });
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
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />

        <br /><br />

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;