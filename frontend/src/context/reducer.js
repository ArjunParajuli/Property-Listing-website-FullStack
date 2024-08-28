import {
  CLOSE_ALERT,
  DISPLAY_ALERT,
  EMPTY_FIELDS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
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
  DELETE_PROPERTY_BEGIN,
  DELETE_PROPERTY_SUCCESS,
  EDIT_PROPERTY_BEGIN,
  EDIT_PROPERTY_SUCCESS,
  EDIT_PROPERTY_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  SEARCH_FILTER_CHANGE,
  RESET_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./action";
import { initialState } from "./AppContext";

export const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertText: "This is an alert!",
        alertType: "warning",
      };
    case CLOSE_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    case EMPTY_FIELDS:
      return {
        ...state,
        showAlert: true,
        alertText: "Enter all Fields!",
        alertType: "warning",
      };
    case REGISTER_USER_BEGIN: // marks start of post call
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS: // marks successful post call
      return {
        ...state,
        user: action.payload.user,
        // token: action.payload.jwtToken,
        userLocation: action.payload.userLocation,
        propertyLocation: action.payload.userLocation,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User Created Successfully",
      };
    case REGISTER_USER_ERROR: // marks failure of post call
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case LOGIN_USER_BEGIN: // marks start of post call
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        // token: action.payload.jwtToken,
        userLocation: action.payload.userLocation,
        showAlert: true,
        alertType: "success",
        alertText: "User Logged in Successfully",
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        // token: null,
        userLoading: false
      };
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        // token: action.payload.jwtToken,
        userLocation: action.payload.userLocation,
        propertyLocation: action.payload.userLocation,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated!",
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CREATE_PROPERTY_BEGIN:
      return {
          ...state, isLoading: true 
      };
    case CREATE_PROPERTY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          // showAlert: true,
          // alertType: 'success',
          // alertText: 'New Property Listed!',
        };
    case CREATE_PROPERTY_ERROR:
      return {
        ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
      }  
    case GET_PROPERTIES_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        properties: action.payload.properties,
        totalProperties: action.payload.propertiesLength,
        numOfPages: action.payload.numOfPages,
      };
    case SET_EDIT_PROPERTY:
      const propertyId = action.payload.id;
      const propertyToUpdate = state.properties.filter(
        (p) => p._id === propertyId
      );
      const { _id, price, owner, status, propertyLocation, propertyType } =
        propertyToUpdate[0];

      return {
        ...state,
        isEditing: true,
        editPropertyId: _id,
        owner,
        price,
        status,
        propertyLocation,
        propertyType,
      };
    case DELETE_PROPERTY_BEGIN:
      return { ...state, isLoading: true };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case EDIT_PROPERTY_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PROPERTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Property Updated!",
      };
    case EDIT_PROPERTY_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case SHOW_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
      };
    case SEARCH_FILTER_CHANGE:
      const name = action.payload.name;
      const value = action.payload.value;
      return {
        ...state,
        isLoading: true,
        [name]: value,
      };
    case RESET_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };
    case CHANGE_PAGE:
      const newPage = action.payload.newPage
      return{
        ...state,
        page: newPage 
      }
    case GET_CURRENT_USER_BEGIN:
      return{
        ...state,
        userLoading: true,
        showAlert: false
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        propertyLocation: action.payload.location,
      }
    default:
      return state;
  }
};
