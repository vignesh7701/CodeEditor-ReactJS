import { combineReducers } from "redux";
import userAuthReducer from "./UserAuthReducer";

const myReducer = new combineReducers({
    user : userAuthReducer
})

export default myReducer