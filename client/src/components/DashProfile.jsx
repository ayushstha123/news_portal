import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess,updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice.js";

const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
        console.log(formData);
      }

      const handleDeleteAccount = async () => {
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`,{
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error));
        }
      };
    
      const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signoutSuccess());
        } catch (error) {
          console.log(error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message))
            } else {
                dispatch(updateSuccess(data));
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    return (
        <div className="max-w-lg mx-auto p-3 self-center">
            <h1 className='text-center text-2xl font-bold mb-16'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='w-32 h-32 cursor-pointer'>
                    <img src={currentUser.profilePic} alt="user" className='rounded-full shadow-lg w-20 h-20 object-cover border-8 border-blue-500' />
                </div>
                <div className='flex flex-col gap-4'>
                    <input type="text" defaultValue={currentUser.username}  id='username' onChange={handleChange} placeholder='username' />
                    <input type="text" defaultValue={currentUser.email} id='email' onChange={handleChange} placeholder='email' />
                    <input type="text" onChange={handleChange} id='password' placeholder='password' />
                    <button type='submit' className='bg-green-500 rounded gap-4 w-full text-white'>update</button>
                </div>
            </form>
            <div className='gap-4 flex justify-between p-5'>
                <span onClick={handleDeleteAccount} className='p-5 text-red-500 cursor-pointer'>delete</span>
                <span onClick={handleSignOut} className='p-5 text-red-500 cursor-pointer'>sign out</span>
            </div>
        </div>
    );
}

export default DashProfile;
