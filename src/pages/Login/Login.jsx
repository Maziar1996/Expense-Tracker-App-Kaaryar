import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import logoImage from "../../assets/svgs/logoImage.svg";
import logoText from "../../assets/svgs/logoText.svg";
import styled from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "123456") {
      login();
      navigate("/dashboard", { replace: true });
    } else {
      setError("ایمیل یا رمز عبور اشتباه است!");
    }
  };

  return (
    <div className={styled.container}>
      <div className={styled.iconWrapper}>
        <img src={logoImage} alt="logo-image" />
        <img src={logoText} alt="logo-text" />
      </div>
      {error && <p className={styled.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className={styled.inputGroup}>
          <label htmlFor="email">ایمیل</label>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styled.input}
            id="email"
          />
        </div>

        <div className={styled.inputGroup}>
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={styled.input}
            id="password"
          />
        </div>

        <button type="submit" className={styled.button}>
          ورود
        </button>
      </form>
    </div>
  );
};

export default Login;
