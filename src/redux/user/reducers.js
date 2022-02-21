import { ActionTypes } from "./types";

const INITIAL_STATE = {
  currentUser: null,
  role: null,
  location: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionTypes.SET_CURRENT_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case ActionTypes.SET_CURRENT_USER_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
