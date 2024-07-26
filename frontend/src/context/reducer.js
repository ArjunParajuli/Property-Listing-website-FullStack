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
  GET_PROPERTIES_BEGIN,
  GET_PROPERTIES_SUCCESS,
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
        jwtToken: action.payload.jwtToken,
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
        jwtToken: action.payload.jwtToken,
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
        token: null,
        userLocation: "",
        propertyLocation: "",
      };
    case UPDATE_USER_BEGIN:
        return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          token: action.payload.jwtToken,
          userLocation: action.payload.userLocation,
          propertyLocation: action.payload.userLocation,
          showAlert: true,
          alertType: 'success',
          alertText: 'User Profile Updated!',
        };
      case UPDATE_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      case HANDLE_CHANGE:
          return {
            ...state,
            [action.payload.name]: action.payload.value,
          };
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
    default:
      return state;
  }
};
