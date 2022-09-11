import React, { useEffect } from 'react'

const Pricing = () => {

  useEffect(() => {
    document.title = 'Pricing'
  }, [])

  return (
    <h1 className='text-center'>Pricing</h1>
  )
}

export default Pricing
