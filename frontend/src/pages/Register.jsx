import React, { useEffect, useState } from 'react'
import Logo from "../assets/images/logo.svg";
import '../assets/css/register.css';
import SubmitBtn from '../components/SubmitBtn';
import Alert from '../components/Alert';
import {useAppContext} from '../context/AppContext';
import FormRow from '../components/FormRow';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    isLogIn: true,
  });

  const navigate = useNavigate();


  // consume data from global context 
  // const {initialState} = useContext(AppContext) // consume using context
  const { showAlert, displayAlert, registerUser, user } = useAppContext() // consume using custom hook
  // console.log(initialState)

  const submitHandler = (e) => {
    e.preventDefault();
    
    const {name, email, password, isLogIn} = userData
    if(password==='' || email==='' || (!isLogIn && name==='')){
      displayAlert();
      return;  // not valid so return without creating a new user
    }

    // new user data
    const newUser = {name, email, password}; 
    if(isLogIn){
      console.log("User already a member!")
    }else{
      registerUser(newUser) // send newUser data to registerUser() func in AppContext
    }
  }

  const changeHandler = (inpText, inpName) => {
    setUserData((prev)=>{
      return{
        ...prev,
      [inpName]: inpText
      }
    })
  }

// if user registers/logs in, go to dashboard
  useEffect(()=>{
    if(user)
      navigate('/')
  }, [user, navigate])

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
  {/* if type='submit' then when toggling, it'll trigger the onSubmit event of form which then calls submitHandler() and as the fields are empty, display alert() func is called & hence alert is displayed */}
              <button className='text-blue-500 hover:underline' type='button' onClick={()=>setUserData((prev) => {
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