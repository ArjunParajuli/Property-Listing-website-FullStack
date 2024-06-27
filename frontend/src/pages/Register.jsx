import React, { useState } from 'react'
import Logo from "../assets/images/logo.svg";
import '../assets/css/register.css';
import SubmitBtn from '../components/SubmitBtn';
import Alert from '../components/Alert';
import {useAppContext} from '../context/AppContext';
import FormRow from '../components/FormRow';


const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    isLogIn: true,
  });


  // consume data from global context 
  // const {initialState} = useContext(AppContext) // consume using context
  const { showAlert, displayAlert } = useAppContext() // consume using custom hook
  // console.log(initialState)

  const submitHandler = (e) => {
    e.preventDefault();
    
    const {name, email, password, isLogIn} = userData
    if(password==='' || email==='' || (!isLogIn && name==='')){
      displayAlert()
    }
  }

  const changeHandler = (inpText, inpName) => {
    console.log(inpText)
    setUserData((prev)=>{
      return{
        ...prev,
      [inpName]: inpText
      }
    })
  }


  return (
    <form className='flex items-center justify-center min-h-screen bg-gray-100' onSubmit={submitHandler}>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='my-4'>
          <img src={Logo} alt="logo" />
        </div>

  
        <h2 className="text-2xl font-bold mb-6 text-center">{userData.isLogIn ? 'Login' : 'Register'}</h2>

        { showAlert && <Alert /> }
  
        { !userData.isLogIn && <FormRow type='text' name='name' onChange={changeHandler} /> }
        <FormRow type='email' name='email' onChange={changeHandler} />
        <FormRow type='password' name='password' onChange={changeHandler} />
  
        <div className='mb-4'>
          <SubmitBtn />
          {userData.isLogIn && <button className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200 mt-2'>Explore the App</button>}
        </div>
  
        <div className='text-center'>
          <p> {userData.isLogIn ? 'Not a member yet?' : 'Already a member?'} </p>
              <button className='text-blue-500 hover:underline' type='submit' onClick={()=>setUserData((prev) => {
                return {
                  ...prev,
                  isLogIn: !prev.isLogIn
                }
              })}>{userData.isLogIn ? 'Register' : 'Login'}</button>
        </div>
      </div>
    </form>
  )
  
}

export default Register