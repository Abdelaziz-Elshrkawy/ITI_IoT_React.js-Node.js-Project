import './home.css';
import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/Topbar/TopBar";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Redux/userSlice.js';

export default function Home() {
  const token = localStorage.getItem('current_token');
  const dispatch = useDispatch()
  const homeSelector = useSelector(stat => stat.user.auth)
  console.log(token)
  useEffect(() => {
    if (token) {
      dispatch(auth(token));
    }
  },[])
  return (
    <div className='home'>
      <TopBar />
       <Header />
       <h2 className="thoughts">My thoughts .........</h2>
       <Posts />
    
    </div>
  );

}
