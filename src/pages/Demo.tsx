import React, { useEffect } from 'react'

const Demo = () => {

  useEffect(() => {
    document.title = 'Demo'
  }, [])

  return (
    <h1 className='text-center'>Demo</h1>
  )
}

export default Demo
