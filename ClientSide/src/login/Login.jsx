<<<<<<< HEAD
import './login.css'
import { useState } from 'react'
=======
import "./login.css";
import { Link } from "react-router-dom";
>>>>>>> 95344a7ed97e2a9efa4da1bc5892a56b16b7b282

export default function Login() {

   const [email , SetEmail]= useState(' ');
  const [password , SetPassword]= useState(' ');
  const [errors , setError]= useState({});
  const validateForm = () =>{
    let isValid = true;
    const newErrors = {};
   
    if(email.trim() === ''){
      newErrors.email = 'the email is required';
      isValid = false;
    }else if(!/\S+@\S+\.\S+/.test(email)){
     newErrors.email= 'email is invalid'
     isValid= false;
    }
    if(password.trim() === ''){
      newErrors.password= 'the password is required'
      isValid = false;
    
    }else if(password.length < 8){
      newErrors.password = "the password should me more than 8 character";
      isValid =false;
    }
    

    setError(newErrors);
    isValid = true;


  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(validateForm()){
      console.log("form submitted");
    }
  }
  return (
<<<<<<< HEAD
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm"  onSubmit={handleSubmit}>
        <label>Email</label>
      <input className='loginInput' type="text" placeholder='Enter Your Email....' onChange={(e) => SetEmail(e.target.value)}/>
          {errors.email && <div className='error'>{errors.email}</div>}
      <label>Password</label>
      
      
      <input className='loginInput' type="password" placeholder='Enter Your Password....' onChange={(e) => SetPassword(e.target.value)}/>
      {errors.password && <div className='error'>{errors.password}</div>}
      <button className='loginButton'>Login</button>
        </form>
        <button className='loginRegisterButton'>Register</button>
   
=======
    <div className="login">
      <pan className="loginTitle">Login</pan>
      <form className="loginForm">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter Your Email...."
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter Your Password...."
        />
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
>>>>>>> 95344a7ed97e2a9efa4da1bc5892a56b16b7b282
    </div>
  );
}
