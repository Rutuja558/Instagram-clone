import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import { followReducer } from './reducers/followersReducer';
import { postReducer } from './reducers/postReducer';
import { registerReducer } from './reducers/registerReducer';
import { passwordReducer } from './reducers/resetPasswordReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    register: registerReducer,
    user: userReducer,
    posts: postReducer,
    followers: followReducer,
    changePassword: passwordReducer
})
// const localStorageLogin = localStorage.getItem("LocalLogin")
//     ? JSON.parse(localStorage.getItem("LocalLogin"))
//     : null
const initialValue = {
    register: {
        // login: { localStorageLogin }
    },
    user: {
        allSuggestedUsers: [],
        myProfile: {}
    },
    posts: {
        AllPosts: []
    },
    followers: {
        allFollowers: [],
        allFollowersPost: []
    }

}
const store = createStore(rootReducer, initialValue, composeWithDevTools(applyMiddleware(thunk)))
export default store