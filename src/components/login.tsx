import { useEffect, useState } from "react";
import "../style/login.css";
import { loginFormType } from "../types/loginTypes";
import { HandleLogin } from "../services/authService";
import openEye from "../assets/view.png";
import closeEye from "../assets/hide.png";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Notification from "../utils/notification";

const Login = () => {

  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [formdata, setFormdata] = useState<loginFormType>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<loginFormType>({
    username: "",
    password: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!formdata.username && !formdata.password) {
      setErrors({
        username: "Username is required",
        password: "Password is required",
      });
      return;
    } else if (!formdata.username) {
      setErrors({ username: "Username is required" });
      return;
    } else if (!formdata.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    const data = await HandleLogin(formdata);
    if (data?.response?.status === 400) {
      console.log("invalid");
      setNotification({
        message: data?.response?.data?.message,
        type: "error",
      });
    } else {
      setNotification({ message: "Login successful", type: "success" });
      setTimeout(()=>{
          localStorage.setItem("vite-react-ts-pwa_token", data?.data?.token);
          localStorage.setItem(
            "vite-react-ts-pwa_login_user",
            JSON.stringify(data?.data)
          );
          navigate("/products");

      },1000)
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormdata({ ...formdata, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const checkLoginuserToken: any = localStorage.getItem(
      "vite-react-ts-pwa_token"
    );
    if (checkLoginuserToken) {
      navigate("/products");
    }
  }, []);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="body-container">
      <NavBar />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formdata.username}
            placeholder="Enter Username"
            onChange={handleInputChange}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formdata.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            <span className="eye-icon" onClick={togglePassword}>
              {showPassword ? (
                <img src={openEye} alt="Eye open" width="20" />
              ) : (
                <img
                  src={closeEye}
                  alt="Eye close"
                  width="20px"
                  height="20px"
                />
              )}
            </span>
          </div>

          <button className="login-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Login;
