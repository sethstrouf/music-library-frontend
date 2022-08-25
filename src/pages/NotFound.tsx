import React, { useEffect } from 'react'

const NotFound = () => {

  useEffect(() => {
    document.title = 'Not Found'
  }, [])

  return (
    <h1 className='text-center'>Not Found</h1>
  )
}

export default NotFound
