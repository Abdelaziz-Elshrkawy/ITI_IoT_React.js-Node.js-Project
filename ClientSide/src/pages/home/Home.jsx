import React from 'react'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import Posts from '../../posts/Posts'

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
