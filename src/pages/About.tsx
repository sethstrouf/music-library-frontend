import React, { useEffect } from 'react'

const About = () => {

  useEffect(() => {
    document.title = 'About'
  }, [])

  return (
    <>
      <h1 className='text-center'>About</h1>
      <p>This will eventually be a functioning website! My name is Seth.</p>
    </>
  )
}

export default About
