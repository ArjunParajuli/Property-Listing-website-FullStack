import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer';
import { DISPLAY_ALERT, CLOSE_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './action';
import axios from 'axios';

// Create a context
export const AppContext = createContext();

const user = localStorage.getItem('user');
const jwtToken = localStorage.getItem('jwtToken');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '', 
  user: user ? JSON.parse(user) : null,
  token: jwtToken || null,
  userLocation: userLocation || '',
  propertyLocation: userLocation || ''
}; 


// Create a component that provides the context
export const AppProvider = ({children}) => {

  // dispatch function to update the state
    const [state, dispatch] = useReducer(reducer, initialState);

    // update showAlert & show the alert message 
    const displayAlert = () => {
      dispatch({type: DISPLAY_ALERT})

      // remove alert msg after 3 sec
      setTimeout(()=>{
        dispatch({type: CLOSE_ALERT})
      }, 3000)
    } 
 
    const storeInLocalStorage = (user, jwtToken, location) => {
      localStorage.setItem('user', JSON.stringify(user)); // we can only store strings in localStorage so convert obj to string
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('location', location)
    }

    const removeFromLocalStorage = () => { // for logout
      localStorage.removeItem('user')
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('location')
    }

    // register a new user (send user data)
    const registerUser = async(newUser) =>{
      dispatch({type: REGISTER_USER_BEGIN});
      try{
        const response = await axios.post('/api/v1/auth/register', newUser)
        const {user, jwtToken, location} = response.data;
        console.log(user, jwtToken, location)
        dispatch({type: REGISTER_USER_SUCCESS, payload: {user, jwtToken, location}})
        
        // store the user data, token & userLocation in localStorage
        storeInLocalStorage(user, jwtToken, location);
      }catch(err){
        dispatch({type: REGISTER_USER_ERROR, payload: {msg: err.response.data.msg}})
        console.log(err.response)
      }      
    }

      return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser }} >
            {children}
        </AppContext.Provider>
      )
}

// custom hook to consume the context
export const useAppContext = () =>{
    return useContext(AppContext) // return the result of useContext
}
