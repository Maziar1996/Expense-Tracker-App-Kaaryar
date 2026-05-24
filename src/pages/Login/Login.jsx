import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import styled from "./Login.module.css";
import Icon from "../../assets/svgs/Icon";

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
        <Icon name="LogoIcon" className={styled.icon} />
        <Icon name="LogoText" className={styled.icon} />
      </div>
      {error && <p className={styled.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className={styled.inputGroup}>
          <label>ایمیل:</label>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styled.input}
          />
        </div>

        <div className={styled.inputGroup}>
          <label>رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={styled.input}
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
