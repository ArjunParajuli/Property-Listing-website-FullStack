import React, { createContext, useContext, useReducer } from 'react'
import { reducer } from './reducer';
import { DISPLAY_ALERT, CLOSE_ALERT } from './action';

// Create a context
export const AppContext = createContext();

const initialState = {
  isLoading: true,
  showAlert: false,
  alertText: '',
  alertType: ''
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

      return (
        <AppContext.Provider value={{ ...state, displayAlert }} >
            {children}
        </AppContext.Provider>
      )
}

// custom hook to consume the context
export const useAppContext = () =>{
    return useContext(AppContext) // return the result of useContext
}

