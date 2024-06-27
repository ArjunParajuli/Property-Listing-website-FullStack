import { CLOSE_ALERT, DISPLAY_ALERT } from "./action";

export const reducer = (action, state) => {
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
    default:
      return state;
  }
};
