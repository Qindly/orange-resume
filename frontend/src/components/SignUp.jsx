// 注册弹窗页面内容
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { authStyles as styles } from "../assets/dummystyle";
import { validateEmail } from "../utils/helpers";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import Input from "./Input";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("请输入姓名");
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
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
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
      setError(error.response?.data?.message || "注册时发生错误");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>创建账户</h3>
        <p className={styles.signupSubtitle}>注册以开始使用 Orange Resume</p>
      </div>
      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Input
          label="姓名"
          value={fullName}
          type="text"
          placeholder="请输入姓名"
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="邮箱"
          value={email}
          type="email"
          placeholder="请输入邮箱"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="密码"
          value={password}
          type="password"
          placeholder="请输入密码"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>
          注册
        </button>

        <p className={styles.switchText}>
          已有账号？
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className={styles.signupSwitchButton}
          >
            去登录
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
