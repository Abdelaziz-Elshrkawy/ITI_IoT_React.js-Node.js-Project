import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [profilePicture, setProfilePicture] = useState(null); // Add profilePicture state
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePicture", profilePicture); // Add profilePicture to the form data

      // Now, you can send `formData` to your server using the fetch API or other methods.
      // Ensure that your server handles file uploads and processes the data correctly.
      console.log("Form submitted");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form
        className="registerForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
        <label>Profile Picture</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button className="registerButton">Register</button>
      </form>
      <button id="loginButton">
        <Link to="/Login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
