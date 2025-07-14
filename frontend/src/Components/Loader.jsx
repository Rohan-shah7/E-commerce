import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 animate-fadeIn">
      <HashLoader color="purple" size={60} />
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        Loading, please wait...
      </p>
    </div>
  )
}

export default Loader
