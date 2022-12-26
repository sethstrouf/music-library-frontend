import React, { useEffect } from 'react'

const Features = () => {

  useEffect(() => {
    document.title = 'Features'
  }, [])

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">Features</h1>
    </div>
  )
}

export default Features
