import React, { useState } from 'react'

const SideBar = ({user}) => {
    const [ user , setUser] = useState({})
    useEffect(() => {
      const data = async ()=>{

      }
    
      return () => {
        setUser(data)
      }
    }, [])
    
  return (
    <div>{
        user.idrole === 2 ? 'admin' : ( user.idrole ===1 ?'nomral' : 'not authorized' )}
    </div>
  )
}

export default SideBar