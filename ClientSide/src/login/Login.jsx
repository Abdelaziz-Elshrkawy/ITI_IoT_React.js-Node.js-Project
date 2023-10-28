import './login.css'

export default function Login() {
  return (
    <div className='login'>
        <pan className="loginTitle">Login</pan>
        <form className="loginForm">
        <lable>Email</lable>
      <input className='loginInput' type="text" placeholder='Enter Your Email....'/>
      <lable>Password</lable>
      <input className='loginInput' type="password" placeholder='Enter Your Password....'/>
      <button className='loginButton'>Login</button>
        </form>
        <button className='loginRegisterButton'>Rigister</button>
   
    </div>
  )
}
