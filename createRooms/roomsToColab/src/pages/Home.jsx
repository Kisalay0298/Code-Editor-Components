import React from 'react'
import LogoSticker from '../components/LogoSticker'



const Home = () => {

    const formHandler = (e) => {
      e.preventDefault()
    }
  return (

    <div className='min-h-screen flex flex-col  bg-gray-800'>
      <div className='flex flex-grow justify-center items-center w-full'>
        <form action="" method="post">
          <div className='bg-gray-900 w-96 flex flex-col p-5 rounded-2xl border border-gray-700 shadow-xl'>
            
            {/* Header Section */}
            <LogoSticker />

            {/* Form Fields */}
            <div className='flex flex-col mt-8 mb-5 gap-4 justify-end'>
              <p className='font-semibold text-cyan-500'>Paste Invitation ROOM ID</p>
              <input className='bg-gray-50 font-medium text-lg rounded-lg p-2 h-12 focus:ring-2 focus:ring-cyan-500 focus:outline-none' type="text" placeholder='ROOM ID' />
              <input className='bg-gray-50 font-medium text-lg rounded-lg p-2 h-12 focus:ring-2 focus:ring-cyan-500 focus:outline-none' type="text" placeholder='USERNAME' />
              <div className="flex justify-end">
                <button type="submit" className="w-40 h-12 font-bold bg-orange-300 rounded-lg cursor-pointer shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-95 transition duration-200" onClick={(e) => formHandler(e)}>Join</button>
              </div>
            </div>

            {/* Footer */}
            <div className='flex justify-center items-center'>
              <p className='text-gray-400 text-xs mr-1'>Don't have invitation id?</p>
              <p><span className='text-green-600 underline cursor-pointer font-semibold text-sm'>create new room</span></p>
            </div>
          </div>
        </form>
      </div>

      <footer className="mt-auto text-center py-4 text-gray-400 ">
        <h4>Built with 💛 by @<a href="https://www.linkedin.com/in/kisalay-komal-16125922b/" target='_blank' className="text-green-400 hover:underline">Kisalay Komal</a> &copy;{new Date().getFullYear()}</h4>
      </footer>
    </div>
  )
}

export default Home