import React from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Posts from '../../components/posts/Posts'

export default function Home (){

  return (
    <>
    <div className='home'>
       <Header />
       <Sidebar />
       <Posts />
    </div>
    </>
  )
}
