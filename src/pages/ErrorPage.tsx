import React, { FC } from 'react'
import img from '../assets/404-error-with-landscape-concept-illustration_114360-7898.avif'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return <div className='min-h-screen bg-slate-900 font-roboto flex justify-center items-center gap-10 text-white flex-col'>
    <img src={img} alt="page not found" />
    <Link to={'/'} className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
      Back
    </Link>
  </div>

}

export default ErrorPage