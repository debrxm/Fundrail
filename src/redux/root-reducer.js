import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./modal/reducers";
import userReducer from "./user/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["modal", "user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

export default persistReducer(persistConfig, rootReducer);
