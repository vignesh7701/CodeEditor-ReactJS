import { combineReducers } from "redux";
import userAuthReducer from "./UserAuthReducer";
import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer";

const myReducer = new combineReducers({
    user: userAuthReducer,
    projects: projectReducer,
    searchTerm : searchReducer,
})

export default myReducer