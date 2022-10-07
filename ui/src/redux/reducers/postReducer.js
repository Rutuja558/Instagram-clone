import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, GET_LOGIN_USER_POST_FAIL, GET_LOGIN_USER_POST_REQUEST, GET_LOGIN_USER_POST_SUCCESS, HANDLE_LIKE_FAIL, HANDLE_LIKE_REQUEST, HANDLE_LIKE_SUCCESS } from "../constants/postConstant"

export const postReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ADD_POST_REQUEST: return { ...state, loading: true }
        case ADD_POST_SUCCESS: return { ...state, loading: false, postAdded: payload }
        case ADD_POST_FAIL: return { ...state, loading: false }

        case GET_LOGIN_USER_POST_REQUEST: return { ...state, loading: true }
        case GET_LOGIN_USER_POST_SUCCESS: return { ...state, loading: false, AllPosts: payload }
        case GET_LOGIN_USER_POST_FAIL: return { ...state, loading: false }

        case HANDLE_LIKE_REQUEST: return { ...state }
        case HANDLE_LIKE_SUCCESS: return { ...state, likeMessage: payload }
        case HANDLE_LIKE_FAIL: return { ...state, error: payload }

        case ADD_COMMENT_REQUEST: return { ...state }
        case ADD_COMMENT_SUCCESS: return { ...state, commentMessage: payload }
        case ADD_COMMENT_FAIL: return { ...state }

        default: return state
    }
}