import "./login.css";
import { useEffect, useRef, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/userSlice";
export default function Login() {
  const [email, SetEmail] = useState(" ");
  const [password, SetPassword] = useState("");
  const [errors, setError] = useState({});
  const dispatch = useDispatch();
  let { loginResponse } = useSelector((stat) => stat.user.login);
  const isMountedRef = useRef(false);
  const navigate = useNavigate();
  let newErrors = {};
  const validateForm = () => {
    let isValid = true;
    newErrors = {};
    if (email.trim() === "") {
      newErrors.email = "the email is required";
      isValid = false;
    } else if (!/\S+@\S+\.com/.test(email)) {
      newErrors.email = "email is invalid";
      isValid = false;
    }
    if (password.trim() === "") {
      newErrors.password = "the password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "the password should me more than 8 character";
      isValid = false;
    }

    setError(newErrors);
    isValid = true;
    return isValid;
  };
  const resetResponse = () => {
    loginResponse = null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };
  const checkValidity = () => {
    newErrors = {};
    if (loginResponse?.logged) {
      newErrors.wrongEntry = "";
      setError(newErrors);
      localStorage.setItem(
        "current_user",
        JSON.stringify({
          user: loginResponse.user,
          logged: loginResponse.logged,
          src: loginResponse.image,
        })
      );
      localStorage.setItem("current_token", loginResponse.token);
      window.location.reload();
      navigate("/");
    } else {
      newErrors.wrongEntry = "Wrong Email or Password";
      setError(newErrors);
      localStorage.clear();
    }
  };
  console.log(loginResponse);
  useEffect(() => {
    if (loginResponse && isMountedRef.current) {
      checkValidity();
    }
    isMountedRef.current = true;
  }, [loginResponse]);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter Your Email...."
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter Your Password...."
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <button className="loginButton">Login</button>
        {errors.wrongEntry && (
          <div className="error center">{errors.wrongEntry}</div>
        )}
      </form>
      <button onClick={resetResponse} className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
      <button onClick={resetResponse} className="backToHome">
        <Link to="/" className="link">
          Back to Home
        </Link>
      </button>
    </div>
  );
}
