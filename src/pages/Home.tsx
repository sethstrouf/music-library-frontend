import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <>
      <div id='tagline' className='text-center p-24 text-9xl'>
        <p className='leading-normal'>Tagline for <span className='text-sky-700 underline'>product</span> here</p>
      </div>
    </>
  )
}

export default Home
