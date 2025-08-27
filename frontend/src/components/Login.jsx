// 登录弹窗页面内容
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
      setError("请输入邮箱");
      return;
    }
    if (!validateEmail(email)) {
      setError("请输入有效的邮箱");
      return;
    }
    if (!password) {
      setError("请输入密码");
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
      setError(error.response?.data?.message || "登录时发生错误");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>欢迎回来</h3>
        <p className={styles.subtitle}>请登录以访问你的 Orange Resume 账户</p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          label="邮箱"
          type="email"
          value={email}
          placeholder="请输入邮箱"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="密码"
          type="password"
          value={password}
          placeholder="请输入密码"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>
          登录
        </button>

        <p className={styles.switchText}>
          还没有账号？{" "}
          <button type="button" onClick={() => setCurrentPage("signup")} className={styles.switchButton}>去注册</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
