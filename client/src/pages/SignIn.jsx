import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [errorMessage,setErrorMessage]=useState(null)
    const [loading,setLoading]=useState(false);
    const [formData,setFormData]=useState({});
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
      console.log(formData);
    }
    const navigate=useNavigate();
  const handleSubmit=async(e)=>{
  e.preventDefault();
  if(!formData.email || !formData.password){
    return setErrorMessage("please fill out all the fields")
  }
    try {
      setLoading(true)
      setErrorMessage(null);
      const res=await fetch('api/auth/signin',{
        method:'POST',
        headers:{'Content-type' :'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      if(data.success===false){ 
        setLoading(false);
        return setErrorMessage("user already exists");
      }     
      navigate('/')
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message)
    }
  
  }
    return (
      <>
      <div>SignUp</div>
      <div className='min-h-screen mt-10'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* left */}
          <div className='flex-1'>           
            <p className='font-extralight text-2xl mt-5'>
              NEWSPORTAL
            </p>
          </div>
          {/* right */}
  
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
             
              <div>
                <Label value='Your email' />
                <TextInput type='text' placeholder='name@company.com' id='email' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your password' />
                <TextInput type='text' placeholder='Password' id='password' onChange={handleChange}/>
              </div>
              <button className='bg-gray-100 p-2 m-2' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
  <Spinner size='sm'>
  </Spinner>  
  <span className='pl-3'>Loading...</span></>
  
                  ) : 'Sign Up'
                }
              </button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Dont have an account?</span>
              <Link to='/signup' className='text-blue-500'>
                Sign Up
              </Link>
            </div>
            {
              errorMessage && (
                <Alert className='mt-6' color='failure'>
                {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
      </>  )
}

export default SignIn