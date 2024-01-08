import { combineReducers } from "redux";
import userReducer from "../redux/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
