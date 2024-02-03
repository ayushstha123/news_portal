import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'

const Header = () => {
    const path=useLocation().pathname
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
            className='px-5 self-center '
           />
        </form> 

        <Navbar.Toggle/>
        
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'}><Link to='/'>Home</Link></Navbar.Link>
            <Navbar.Link active={path==='/about'}><Link to='/about'>About</Link></Navbar.Link>
            <Navbar.Link active={path==='/sigin'}><Link to='/signin'>SignIn</Link></Navbar.Link>
            </Navbar.Collapse> 
                  
        </Navbar>
        
    </div>
  )
}

export default Header