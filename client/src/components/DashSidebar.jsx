import React, { useEffect, useState } from 'react'
import {Avatar, Sidebar} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice.js';

const DashSidebar = () => {
    const location=useLocation()
    const [tab,setTab]=useState('')
    const dispatch=useDispatch();
    const { currentUser} = useSelector(state => state.user);
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const tabFormUrl=urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
  
    },[location.search]);
    const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signoutSuccess());
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Sidebar className='w-full md:w-56 '>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={tab==='profile'} label={currentUser.role}>
                    <Avatar img={'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'}>Profile</Avatar>
                </Sidebar.Item>
                </Link>
                
                {currentUser.role === 'admin' ? (
    <Link to={'/dashboard?tab=posts'}>
        <Sidebar.Item active={tab==='posts'} label={"Post"}>
            Posts
        </Sidebar.Item>
    </Link>
) : ''}


                


                <Sidebar.Item>
<span onClick={handleSignOut}>Sign out</span></Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  )
}

export default DashSidebar