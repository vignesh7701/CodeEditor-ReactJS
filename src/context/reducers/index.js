import { combineReducers } from "redux";
import userAuthReducer from "./UserAuthReducer";
import projectReducer from "./projectReducer";

const myReducer = new combineReducers({
    user: userAuthReducer,
    projects: projectReducer,
})

export default myReducer