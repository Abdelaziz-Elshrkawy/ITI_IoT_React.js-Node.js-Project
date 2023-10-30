import './Register.css'
<<<<<<< HEAD
import { useState } from 'react'

=======
import { Link } from 'react-router-dom'
>>>>>>> 95344a7ed97e2a9efa4da1bc5892a56b16b7b282
export default function Register() {
  const [name , SetName]= useState(' ');
  const [email , SetEmail]= useState(' ');
  const [password , SetPassword]= useState(' ');
  const [errors , setError]= useState({});
  const validateForm = () =>{
    let isValid = true;
    const newErrors = {};
    if(name.trim() === ''){
      newErrors.name = 'the Name is required';
      isValid = false
    }
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
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
        <lable>Name</lable>
      <input className='registerInput' type="text" value={name} placeholder='Enter Your Name....'onChange={(e) => SetName(e.target.value)}/>
       {errors.name && <div className='error'>{errors.name}</div>}
        <lable>Email</lable>
      <input className='registerInput' type="text" value={email} placeholder='Enter Your Email....' onChange={(e) => SetEmail(e.target.value)}/>
      {errors.email && <div className='error'>{errors.email}</div>}
      <lable>Password</lable>
      <input className='registerInput' type="password" value={password} placeholder='Enter Your Password....' onChange={(e) => SetPassword(e.target.value)}/>
      {errors.password && <div className='error'>{errors.password}</div>}
      <button className='registerButton'>Register</button>
        </form>
        <button className='loginButton'>
        <Link to ="/Login" className='link'>Login</Link>
        </button>
        
   
    </div>
  )
}
