import './home.css';
import React from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/Topbar/TopBar";

export default function Home() {
  return (
    <div className='home'>
    
      <TopBar/>
       <Header />
       <h2 className="thoughts">My Thoughts .........</h2>
       <Posts />
    
    </div>
  );

}
