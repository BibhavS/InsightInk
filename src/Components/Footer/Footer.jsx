import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <section className="px-10 py-14 shadow-2xl border">
          <div>
              <div className="flex justify-center px-4">
                <div className="mb-4 flex flex-col items-center">
                <h1 className='sm:text-4xl text-2xl mb-5 text-slate-800 font-medium'>InsightInk</h1>
                 <p className="sm:text-base text-[0.7rem] text-black">
                    &copy; Copyright 2023. All Rights Reserved.
                  </p>
                </div>
  
              </div>
          </div>
      </section>
    </>
  )
}
