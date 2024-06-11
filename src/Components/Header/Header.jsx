import React from 'react'
import { LogoutBtn, Container } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
    <header className='py-8 px-10 shadow-2xl'>
      <Container>
         <nav className='flex'>
          <div className='mr-4'>
           <h1 className='text-[2.2rem] text-slate-800 font-semibold text-center'>InsightInk</h1>
          </div>
          <ul className='flex ml-auto text-xl font-semibold'>
             {navItems.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button className='inline-bock px-6 py-2 duration-200 hover:bg-gray-100 rounded-full'
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
         </nav>
      </Container>

    </header>
    </>
  )
}
