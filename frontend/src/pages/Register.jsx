import React, { useEffect, useState } from 'react'
import Logo from "../assets/images/logo.svg";
import '../assets/css/register.css';
import SubmitBtn from '../components/SubmitBtn';
import Alert from '../components/Alert';
import {useAppContext} from '../context/AppContext';
import FormRow from '../components/FormRow';
import { useNavigate } from 'react-router-dom';
import { EMPTY_FIELDS } from '../context/action';


const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: 'test@gmail.com',
    password: 'Test@123',
    isLogIn: true,
  });

  const navigate = useNavigate();


  // consume data from global context 
  // const {initialState} = useContext(AppContext) // consume using context
  const { showAlert, displayAlert, registerUser, loginUser, user } = useAppContext() // consume using custom hook
  // console.log(initialState)

  const submitHandler = (e) => {
    e.preventDefault();
    
    const {name, email, password, isLogIn} = userData
    if(password==='' || email==='' || (!isLogIn && name==='')){
      displayAlert(EMPTY_FIELDS);
      return;  // not valid so return without creating a new user
    }
    
    if(isLogIn){
      // user entered data
      const newUser = {email, password};
      loginUser(newUser)
    }else{
      const newUser = {name, email, password}; 
      registerUser(newUser) // send newUser data to registerUser() func in AppContext
    }
  }

  const changeHandler = (e) => {
    setUserData((prev)=>{
      return{
        ...prev,
      [e.target.name]: e.target.value
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
          <img src={Logo} alt="logo" width="160" height='50' />
        </div>

  
        <h2 className="text-2xl font-bold mb-6 text-center">{userData.isLogIn ? 'Login' : 'Register'}</h2>

        { showAlert && <Alert /> }
  
        { !userData.isLogIn && <FormRow type='text' name='name' value={userData.name} changeHandler={changeHandler} /> }
        <FormRow type='email' name='email' defaultValue='test@gmail.com' value={userData.email} changeHandler={changeHandler} />
        <FormRow type='password' name='password' defaultValue='Test@123' value={userData.password} changeHandler={changeHandler} />
  
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