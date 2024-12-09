import React, { useState } from 'react'
import { LogoutBtn, Container } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <>
    <header className='py-8 md:px-10 px-5 shadow-2xl'>
      <Container>
         <nav className='flex items-center justify-center'>
          <div className='mr-4'>
           <h1 className='md:text-[2.2rem] text-[1.8rem] text-slate-800 font-semibold text-center'>InsightInk</h1>
          </div>
          <ul className='hidden sm:flex ml-auto md:text-xl text-base font-semibold'>
             {navItems.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button className='inline-bock md:px-6 px-4 py-2 duration-200 hover:bg-gray-100 rounded-full'
                    onClick={() => navigate(item.slug)}>
                    {item.name}
                    </button>
                  </li>
                ) : null
             ))}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
          <div onClick={handleNav} className='sm:hidden block ml-auto'>
           {nav ? <MdOutlineClose size={35}/> : <MdMenu size={35}/>} 
          </div>
        
         </nav>
         <div className={nav ? 'fixed z-20 left-0 top-0 w-[60%] h-[100%] bg-white ease-in-out duration-500' : 'h-full w-0 left-[-100%] ease-in-out duration-500 fixed '}>
         <ul className='sm:flex mt-16 text-2xl font-semibold'>
             {navItems.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button className='inline-bock md:px-6 px-4 py-2 mb-7 ml-4 duration-200 hover:bg-gray-100 rounded-full'
                    onClick={() => navigate(item.slug)}>
                    {item.name}
                    </button>
                  </li>
                ) : null
             ))}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </div>
      </Container>

    </header>
    </>
  )
}
