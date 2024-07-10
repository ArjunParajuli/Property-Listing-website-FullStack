import { CLOSE_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./action";

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
    case REGISTER_USER_BEGIN: // marks start of post call 
      return {
        ...state,
        isLoading: true 
      };
    case REGISTER_USER_SUCCESS: // marks successful post call 
      return{
        ...state, 
        user: action.payload.user,
        jwtToken: action.payload.jwtToken,
        userLocation: action.payload.userLocation,
        propertyLocation: action.payload.userLocation,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Created Successfully'
      };
    case REGISTER_USER_ERROR: // marks failure of post call 
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg
      };
   
    default:
      return state;
  }
};
