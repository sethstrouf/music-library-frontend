import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <>
      <p className='text-center p-24 text-5xl sm:text-7xl lg:text-9xl leading-normal'>Tagline for <span className='text-sky-700 underline'>Songsemble</span> here</p>
    </>
  )
}

export default Home
