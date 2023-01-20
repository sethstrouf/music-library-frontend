import { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
  <div className='text-left p-24 font-light text-4xl sm:text-6xl lg:text-8xl leading-normal'>
    <p>
      <span className='cursive text-sky-600 font-bold text-5xl sm:text-7xl lg:text-9xl'>Songsemble...</span>
      <br />
      your music <span className="font-normal text-sky-800 ">library </span>
      and <span className="font-normal text-sky-800 ">networking</span> solution.
    </p>
  </div>
  )
}

export default Home
