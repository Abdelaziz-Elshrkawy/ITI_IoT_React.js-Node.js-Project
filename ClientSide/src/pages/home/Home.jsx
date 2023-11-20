import './home.css';
import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/Topbar/TopBar";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../Redux/userSlice.js';

export default function Home() {
  return (
    <div className='home'>
      <TopBar />
       <Header />
       <Posts />
    
    </div>
  );

}
