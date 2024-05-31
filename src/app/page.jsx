"use client"
import Navbar from '@/components/Navbar'
import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <>
    <Navbar/>
    <div className='first-page'>
      <div className='first-page-container'>
        <h1>Welcome to EventCo!</h1>
        <Link href='/home'>
          <button className='first-page-container-btn'>GET STARTED</button>
        </Link>
      </div>
      
    </div>
    </>
  )
}

export default page