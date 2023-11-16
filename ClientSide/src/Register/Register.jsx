import "./Register.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearSignUpResponse, signUp } from "../Redux/userSlice";
import Lottie from "lottie-react";
import backGround from "../assets/back.json";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const imageRef = useRef(null);
  const { singUpResponse } = useSelector((stat) => stat.user.signup);
  const navigate = useNavigate();

  let newErrors;
  const validateForm = () => {
    newErrors = {};
    let isValid = true;
    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.com$/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be more than 8 characters";
      isValid = false;
    }
    if (profilePicture === null) {
      newErrors.profileImage = "Profile image is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        signUp({
          name,
          email,
          password,
          profilePicture,
        })
      );
    }
  };
  const handleFile = (e) => {
    if (e.target.files[0].size < 100000.2) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // console.log(e.target.files[0]);
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      setErrors({ profileImage: "" });
    } else {
      setErrors({ profileImage: "image size must be less than 100kb" });
    }
  };

  const checkUser = () => {
    newErrors = {};
    if (singUpResponse.response === "user exist") {
      newErrors.email = "This email exists";
      setErrors(newErrors);
    } else if (singUpResponse.response === "Success") {
      newErrors.email = "";
      newErrors.success = "you have been registered ✔";
      setErrors(newErrors);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePicture("");
      imageRef.current.value = null;
      navigate("/login");
      dispatch(clearSignUpResponse());
    }
    // console.log(singUpResponse);
    // console.log(errors);
  };
  useEffect(() => {
    if (singUpResponse) {
      checkUser();
    }
  }, [singUpResponse]);
  return (
    <div className="register">
      <Lottie animationData={backGround} id="backGround" />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          className="registerInput"
          type="text"
          value={name}
          placeholder="Enter Your Name...."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          value={email}
          placeholder="Enter Your Email...."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          value={password}
          placeholder="Enter Your Password...."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Profile Image</label>
        <input
          className="registerInput"
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          placeholder="Enter Your Password...."
          ref={imageRef}
          onChange={handleFile}
        />
        <p></p>
        <button className="registerButton">Register</button>
      </form>
      <Link to="/Login" className="link">
        <button
          onClick={() => dispatch(clearSignUpResponse())}
          className="loginInReg"
        >
          Login
        </button>
      </Link>
      <Link to="/" className="link">
        <button
          onClick={() => dispatch(clearSignUpResponse())}
          className="backToHome"
        >
          Back to Home
        </button>
      </Link>
      {errors.name && <div className="error">{errors.name}</div>}
      {errors.email && <div className="error">{errors.email}</div>}
      {errors.password && <div className="error">{errors.password}</div>}
      {errors.profileImage && (
        <div className="error">{errors.profileImage}</div>
      )}
      <p id="success">{errors.success}</p>
    </div>
  );
}
