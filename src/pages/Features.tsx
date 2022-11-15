import React, { useEffect } from 'react'

const Features = () => {

  useEffect(() => {
    document.title = 'Features'
  }, [])

  return (
    <h1 className='text-center'>Features</h1>
  )
}

export default Features
