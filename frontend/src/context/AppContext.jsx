import React, { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { toast, Bounce } from 'react-toastify';
import {
  DISPLAY_ALERT,
  CLOSE_ALERT,
  EMPTY_FIELDS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SHOW_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_PROPERTY_BEGIN,
  CREATE_PROPERTY_SUCCESS,
  CREATE_PROPERTY_ERROR,
  GET_PROPERTIES_BEGIN,
  GET_PROPERTIES_SUCCESS,
  SET_EDIT_PROPERTY,
  DELETE_PROPERTY_SUCCESS,
  EDIT_PROPERTY_BEGIN,
  EDIT_PROPERTY_SUCCESS,
  EDIT_PROPERTY_ERROR,
  SHOW_STATS_SUCCESS,
  SHOW_STATS_BEGIN,
  RESET_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./action";
import axios from "axios";

// Create a context
export const AppContext = createContext();

/* No need to store in local storage bcoz we used cookie */
// const user = localStorage.getItem("user");
// const jwtToken = localStorage.getItem("jwtToken");
// const userLocation = localStorage.getItem("location");

// editPropertyId, owner, price, propertyLocation, propertyType 
// either store currently editing property's info or store info of property to be added
export const initialState = {
  userLoading: true, // used when getCurrentUser is being called, so we set it to true by default
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  propertyLocation: "",
  showSidebar: false,
  isEditing: false,
  editPropertyId: '',
  owner: '',
  price: 0,
  propertyTypeOptions: ['rent', 'buy'],
  propertyType: 'rent',
  statusOptions: ['meeting', 'declined', 'pending'],
  status: 'pending',
  properties: [],
  totalProperties: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

// Create a component that provides the context
export const AppProvider = ({ children }) => {
  // dispatch function to update the state
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
    /* used cookie so no need to send token now */
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });

  // update showAlert & show the alert message
  const displayAlert = (type) => {
    if (type === EMPTY_FIELDS) dispatch({ type: EMPTY_FIELDS });
    else dispatch({ type: DISPLAY_ALERT });

    // remove alert msg after 3 sec
    setTimeout(() => {
      dispatch({ type: CLOSE_ALERT });
    }, 3000);
  };

  const clearAlert = () =>{
    setTimeout(()=>{
      dispatch({ type: CLOSE_ALERT });
    }, 3000)
  }

  // const storeInLocalStorage = (user, jwtToken, location) => {
  //   localStorage.setItem("user", JSON.stringify(user)); // we can only store strings in localStorage so convert obj to string
  //   localStorage.setItem("jwtToken", jwtToken);
  //   localStorage.setItem("location", location);
  //   getAllProperties()
  // };

  // const removeFromLocalStorage = () => {
  //   // for logoutUser
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("jwtToken");
  //   localStorage.removeItem("location");
  // };

  // register a new user (send user data)
  const registerUser = async (newUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", newUser);
      const { user, location } = response.data;
      console.log(user, location);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      });

      // store the user data, token & userLocation in localStorage
      // storeInLocalStorage(user, jwtToken, location);
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
      console.log(err.response);
    }
  };

  const loginUser = async(newUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", newUser);
      const { user, location } = response.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });

      // store the user data, token & userLocation in localStorage
      // storeInLocalStorage(user, jwtToken, location);
      getAllProperties()
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
      console.log(err.response);
    }
  };

  const toggleSidebar = () => {
    dispatch({ type: SHOW_SIDEBAR });
  };

  const logoutUser = async() => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
    // removeFromLocalStorage();
  };

  const updateUser = async (userData) => {
    dispatch({type: UPDATE_USER_BEGIN})
    try{
      const res = await authFetch.patch("/auth/update-user", userData);
      console.log(res)
      const { user, userLocation } = res.data;

      dispatch({type: UPDATE_USER_SUCCESS, payload: {user, userLocation}})
      // storeInLocalStorage(user, jwtToken, location);
    } catch (err) {
      dispatch({type: UPDATE_USER_ERROR, payload: {msg: err.response.data.msg}})
      console.log(err);
    }
    clearAlert();
  };

  // for handling change in inputs of AddProperty comp
  const handleChangeInContext = (value, name) =>{
    dispatch({type: HANDLE_CHANGE, payload: {name: name, value: value}})
    // console.log(value, name)
  }

  const createProperty = async() =>{
    dispatch({ type: CREATE_PROPERTY_BEGIN });
    try {
      const { owner, price, propertyLocation, propertyType, status } = state;
      const res = await authFetch.post('/properties', {
        owner,
        price,
        propertyLocation,
        propertyType,
        status,
      });
      
      console.log(res)
      if(res?.status === 201){
      dispatch({ type: CREATE_PROPERTY_SUCCESS });
      toast.success('Property Listed Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      }

    } catch (error) {
      // if (error.response.status === 401) return;
      console.log(error)
      dispatch({
        type: CREATE_PROPERTY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  }

  const getAllProperties = async() =>{
   
    let url = `/properties?page=${state.page}&status=${state.searchStatus}&propertyType=${state.searchType}&sort=${state.sort}`
    if(state.search) url = url+`&search=${state.search}`
    dispatch({type: GET_PROPERTIES_BEGIN})
    
    try{
      const res = await authFetch.get(url)
      console.log(res.data)
      const { properties, propertiesLength, numOfPages } = res.data;
       console.log("Start")
      dispatch({
        type: GET_PROPERTIES_SUCCESS,
        payload: {
          properties, propertiesLength, numOfPages
        },
      });
      // console.log("Out of try")
    }catch(err){
      console.log("Catch", err)
      logoutUser()
    }
  };

// set the currently editing property's details in our state
  const setEditProperty = (id) => {
    dispatch({type: SET_EDIT_PROPERTY, payload: {id}})
  };

  const editProperty = async() =>{
    dispatch({ type: EDIT_PROPERTY_BEGIN });

    try {
      const { owner, price, propertyLocation, propertyType, status } = state;
      await authFetch.patch(`/properties/${state.editPropertyId}`, {
        owner,
        price,
        propertyLocation,
        propertyType,
        status,
      });
      toast.success('Property Updated Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      dispatch({ type: EDIT_PROPERTY_SUCCESS });
      // dispatch({ type: CLEAR_VALUES });
      
    } catch (error) {
      dispatch({
        type: EDIT_PROPERTY_ERROR,
        payload: { msg: error?.response?.data?.msg },
      });
    }
    getAllProperties()
    clearAlert();
  }

  const deleteProperty = async (propertyId) => {
    try{
      const res = await authFetch.delete(`/properties/${propertyId}`)
      console.log(res)
      dispatch({type: DELETE_PROPERTY_SUCCESS, payload:{msg: "Property Removed!"}})
      toast.error('Property Removed Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });

      getAllProperties() // get call to get the updated jobs from the db
    }catch(err){
      logoutUser()
    }
  };


  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/properties/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

// search input filter fields 
  const searchChangeHandler = ({name, value}) =>{
    console.log(name, value)
    dispatch({type: 'SEARCH_FILTER_CHANGE', payload:{ name, value} })
  }

const resetFilters = () =>{
  dispatch({ type: RESET_FILTERS });
}

const changePage = (newPage) =>{
  dispatch({type:CHANGE_PAGE, payload:{newPage}})
}

const getCurrentUser = async() =>{
  dispatch({type: GET_CURRENT_USER_BEGIN})
  try{
    const { data } = await authFetch.get('/auth/getCurrentUser');
    const {user, location} = data;
    dispatch({type: GET_CURRENT_USER_SUCCESS, payload: {user, location}})
  }catch(err){
    console.log(err)
    logoutUser();
  }
}

// run whenever app loads for the first time / refreshes. Using this as we're not storing the user details in local storage anymore
useEffect(()=>{
  getCurrentUser();
}, [])


  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChangeInContext,
        createProperty,
        getAllProperties,
        setEditProperty,
        editProperty,
        deleteProperty,
        showStats,
        searchChangeHandler,
        resetFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook to consume the context
export const useAppContext = () => {
  return useContext(AppContext); // return the result of useContext
};
