import { ActionTypes } from "./types";

export const setCurrentUser = (user) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const setCurrentUserRole = (role) => ({
  type: ActionTypes.SET_CURRENT_USER_ROLE,
  payload: role,
});
export const setCurrentUserLocation = (location) => ({
  type: ActionTypes.SET_CURRENT_USER_LOCATION,
  payload: location,
});
