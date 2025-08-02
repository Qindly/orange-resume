import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helpers";
import { API_PATHS } from "../utils/apiPaths";
import Input from "./Input";  
import axiosInstance from "../utils/axiosInstance";

import { authStyles as styles } from "../assets/dummystyle";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>
          Please login to access your Orange Resume account
        </p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        <p className={styles.switchText}>
          Don't have an account?{" "}
          <button type="button" onClick={() => setCurrentPage("signup")} className={styles.switchButton}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
