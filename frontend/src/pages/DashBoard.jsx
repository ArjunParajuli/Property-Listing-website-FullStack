import React, { useEffect } from 'react'

const DashBoard = () => {
    const fetchData = async()=>{
      try{
        const resp = await fetch('/')
        console.log(resp)
        const json = await resp.json();
        console.log(json)     
      }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchData()
  }, []);

  return (
    <div>
      Dashboard/Home
    </div>
  )
}

export default DashBoard