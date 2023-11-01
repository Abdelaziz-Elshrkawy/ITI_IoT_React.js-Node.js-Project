import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar() {
    const user = true;
    return (
        <div className="top">
            <div className="topleft">
                <i className="topIcon fa-brands fa-facebook-f"></i>
                <i className="topIcon fa-brands fa-twitter"></i>
                <i className="topIcon fa-brands fa-pinterest-p"></i>
                <i className="topIcon fa-brands fa-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">
                            HOME
                        </Link>
                    </li>
                     <li className="topListItem">
                        <Link to="/" className="link">
                            ABOUT
                        </Link>
                    </li>
                    {/* <li className="topListItem">
                        <Link to="/" className="link">
                            CONTACT
                        </Link>
                    </li>  */}
                    <li className="topListItem">
                        <Link to="/write" className="link">
                            WRITE
                        </Link>
                    </li>
                    <li className="topListItem">{user && 'LOGOUT'}</li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <img
                        className="topImg"
                        src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/drums-vintage-retro-music-circle-icon-kevin-garbes.jpg"
                        alt=""
                    ></img>
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

                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}
