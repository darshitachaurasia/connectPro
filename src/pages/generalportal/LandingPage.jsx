import React from 'react'

import Hero from './phone.png'
function LandingPage() {
  return (
    
    <div className='bg-[#2d0727] text-white min-h-screen flex items-center'>

  {/* Left Side - Text */}
  <main className='w-2/3 px-30 flex flex-col justify-center   mt-10 '>
    <h1 className='text-7xl'>Find the Right Mentor</h1>
    <h1 className='text-8xl font-semibold text-[#ff00e6]'>One session</h1>
    <h1 className='text-8xl font-semibold text-[#ff00e6]'>at a Time</h1>
  </main>

  {/* Right Side - Image */}
  <div className="w-1/2 flex items-center justify-center">
    <img src={Hero} alt="hero" className="w-[500px] max-w-full " />
  </div>

</div>


  )
}

export default LandingPage;




