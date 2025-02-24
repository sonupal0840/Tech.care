import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import style from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validUsername = "Dr. Jose Simmons";
  const validPassword = "Admin@123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    if (username === validUsername && password === validPassword) {
      toast.success(`Welcome, ${validUsername}!`);
      navigate("/content");
    } else {
      toast.error("Invalid username or password.");
    }
  };

  return (
    <div id={style.Content}>
      <section id={style.login_container}>
        <h1>Tech.Care Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div id={style.form_group}>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter Dr. Jose Simmons"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div id={style.form_group}>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" id={style.submit_button}>
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;

