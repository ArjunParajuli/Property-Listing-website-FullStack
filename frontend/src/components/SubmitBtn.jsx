import React from 'react'
import { useAppContext } from '../context/AppContext'

const SubmitBtn = () => {
  const {isLoading} = useAppContext()
  return (
        <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200' type='submit' disabled={isLoading}>Submit</button>
  )
}

export default SubmitBtn