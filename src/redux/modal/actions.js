import { ActionTypes } from "./types";

export const setType = (data) => ({
  type: ActionTypes.SET_TYPE,
  payload: data,
});
export const toggleModalVisible = (data) => ({
  type: ActionTypes.TOGGLE_MODAL_VISIBLE,
  payload: data,
});
