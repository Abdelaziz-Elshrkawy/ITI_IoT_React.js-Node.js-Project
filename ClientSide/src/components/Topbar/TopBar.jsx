import { Link, useNavigate } from "react-router-dom";
import "./TopBar.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import lottieFile from "../../assets/pulse.json";
import Lottie from "lottie-react";
export default function TopBar() {
  const userData = JSON.parse(localStorage.getItem("current_user"))
    ? JSON.parse(localStorage.getItem("current_user"))
    : {
        logged: false,
      };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="top">
      <div className="topleft">
        <Link to="/">
          <Lottie animationData={lottieFile} id="logo" />
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {userData?.logged ? (
          <div className="img-cont">
            <img
              className="topImg"
              src={userData.src}
              alt="user-image"
              title={userData.user.name}
            ></img>
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/Login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/Register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <div className="logout-cont">
          <Link to='/myposts' className="link">
          <span className="logout">My Posts</span>
          </Link>
          <span onClick={handleLogout} className="logout">
            Logout
          </span>
        </div>
        {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
      </div>
    </div>
  );
}
