import './TopBar.css'

export default function TopBar() {
  return (
    <div className='top'>
      <div className="topleft">
      <i className="topIcon fa-brands fa-facebook-f"></i>
      <i className="topIcon fa-brands fa-twitter"></i>
      <i className="topIcon fa-brands fa-pinterest-p"></i>
      <i className="topIcon fa-brands fa-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className='topListItem'>HOME</li>
          <li className='topListItem'>ABOUT</li>
          <li className='topListItem'>CONTACT</li>
          <li className='topListItem'>WRITE</li>
          <li className='topListItem'>LOGOUT</li>
        </ul>
      </div>
      <div className="topRight">
        <img 
        className="topImg"
        src="https://www.katebackdrop.com/cdn/shop/articles/Photo_by_David_Werbrouck_on_Unsplash.jpg?v=1665711487" alt=""></img>
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}
