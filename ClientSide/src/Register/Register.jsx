import "./Register.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../Redux/userSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Add profilePicture state
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { singUpResponse } = useSelector(
    (stat) => stat.user.signup
  );
  let newErrors;
  const validateForm = () => {
    let isValid = true;
    newErrors = {}

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
      let isValid = false;
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
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0])
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
  };

  const checkUser = () => {
    newErrors = {};
    if (singUpResponse.response === "user exist") {
      newErrors.email = "This email exists";
      setErrors(newErrors);
    } else if (singUpResponse.response === "Success") {
      newErrors.email = "";
      setErrors(newErrors);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePicture("");
    }
    console.log(singUpResponse);
    console.log(errors);
  };
  useEffect(() => {
    if (singUpResponse) {
      checkUser();
    }
  }, [singUpResponse]);
  return (
    <div className="register">
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
        {errors.name && <div className="error">{errors.name}</div>}
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          value={email}
          placeholder="Enter Your Email...."
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          value={password}
          placeholder="Enter Your Password...."
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <label>Profile Image</label>
        <input
          className="registerInput"
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          placeholder="Enter Your Password...."
          onChange={handleFile}
        />
        {errors.profileImage && (
          <div className="error">{errors.profileImage}</div>
        )}
        <button className="registerButton">Register</button>
      </form>
        <Link to="/Login" className="link">
      <button className="loginInReg">
          Login
      </button>
        </Link>
        <Link to="/" className="link">
      <button className="backToHome">
          Back to Home
      </button>
        </Link>
      <p>{errors.success}</p>
    </div>
  );
}
