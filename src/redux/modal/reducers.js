import { ActionTypes } from "./types";

const INITIAL_STATE = {
  type: "",
  selectModalVisible: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL_VISIBLE:
      return {
        ...state,
        selectModalVisible: action.payload,
      };
    case ActionTypes.SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
