import './Register.css'
import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div className='register'>
        <pan className="registerTitle">Register</pan>
        <form className="registerForm">
        <lable>User Name</lable>
      <input className='registerInput' type="text" placeholder='Enter Your Name....'/>
        <lable>Email</lable>
      <input className='registerInput' type="text" placeholder='Enter Your Email....'/>
      <lable>Password</lable>
      <input className='registerInput' type="password" placeholder='Enter Your Password....'/>
      <button className='registerButton'>Register</button>
        </form>
        <button className='loginButton'>
        <Link to ="/Login" className='link'>Login</Link>
        </button>
        
   
    </div>
  )
}
