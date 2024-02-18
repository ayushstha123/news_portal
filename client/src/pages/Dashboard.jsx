import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFormUrl=urlParams.get('tab');
    if(tabFormUrl){
      setTab(tabFormUrl);
    }

  },[location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
    <div className="md:w-56 bg-slate-500">      <DashSidebar/>
</div>
<div>{tab === 'profile' && <DashProfile/>}</div>
{tab==='posts' && <DashPost/>}
    </div>
  )
}

export default Dashboard