import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
    const path=useLocation().pathname
    const {currentUser}=useSelector(state=>state.user)
  return (
    <div>
        <Navbar className='border-b-2 p-2 justify-between '>
            <div className='flex'>
            <Link to="/" className='self-center text-sm sm:text-xl font-bold dark:text-white'>
                News_Portal
            </Link>
        </div>

        <form>
            <TextInput
            type='text'
            placeholder='Search...'
            className='px-5 self-center'
           />
        </form> 

        <Navbar.Toggle/>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'}><Link to='/'>Home</Link></Navbar.Link>
            <Navbar.Link active={path==='/about'}><Link to='/about'>About</Link></Navbar.Link>
            {currentUser ? (
                <Dropdown 
                arrowIcon={false}
                inline
                
                label={
                    <Avatar
                    alt='user'
                    img={currentUser.profilePic}
                    rounded/>
                }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-bold truncate'>{currentUser.email}</span>
<Link to={'/dashboard?tab=profile'}>
    <Dropdown.Item>profile</Dropdown.Item>
    <Dropdown.Divider/>
<Dropdown.Item>Sign out</Dropdown.Item>
</Link>
                    </Dropdown.Header>
                </Dropdown>
            ): (
                <Navbar.Link active={path==='/sigin'}>
                <Link to='/signup'>Sign Up</Link>
                </Navbar.Link>
)}
            
            </Navbar.Collapse> 
        </Navbar>
    </div>
  )
}

export default Header