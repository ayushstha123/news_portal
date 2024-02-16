import React, { useEffect, useState } from 'react'
import {Avatar, Sidebar} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'

const DashSidebar = () => {
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab==='profile'} label={"User"}>
                    <Avatar img={'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}>Profile</Avatar>
                </Sidebar.Item>
                </Link>
                <Sidebar.Item active>
Signout                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  )
}

export default DashSidebar