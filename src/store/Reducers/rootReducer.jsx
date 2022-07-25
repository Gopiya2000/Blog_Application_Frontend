import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer, SingleBlogreducer } from "./blogReducer";
import { userReducer, tokenUserReducer, profilesReducer, BlogReducer } from "./userReducers";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    blog: reducer,
    singleBlog: SingleBlogreducer,
    userDetails: userReducer,
    profileDetails: profilesReducer,
    profile: profileReducer,
    userTokener: tokenUserReducer
})

export default rootReducer