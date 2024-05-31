import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link";

function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div className='navbar'>
      <div className="navbar-container">
        <Link className='link' href="/home">
          <h2 id='navbarName'>EventCo</h2>
        </Link>
        
        {isSignedIn ? (
          <div className='navbar-container-right'>
            <p>Welcome {user.firstName}</p>
            <UserButton fallbackRedirectUrl="/" />
          </div>
        ) : (
        <Link href={"/sign-in"}>
          <button id='loginBtn'>
            Login
          </button>
        </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
