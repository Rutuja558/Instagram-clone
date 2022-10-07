import { FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_ALL_FOLLOWERS_FAIL, GET_ALL_FOLLOWERS_POST_FAIL, GET_ALL_FOLLOWERS_POST_REQUEST, GET_ALL_FOLLOWERS_POST_SUCCESS, GET_ALL_FOLLOWERS_REQUEST, GET_ALL_FOLLOWERS_SUCCESS } from "../constants/followersConstant"

export const followReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FOLLOW_USER_REQUEST: return { ...state, loading: true }
        case FOLLOW_USER_SUCCESS: return { ...state, loading: false, followMessage: payload }
        case FOLLOW_USER_FAIL: return { ...state, loading: false }

        case GET_ALL_FOLLOWERS_REQUEST: return { ...state, loading: true }
        case GET_ALL_FOLLOWERS_SUCCESS: return { ...state, loading: false, allFollowers: payload }
        case GET_ALL_FOLLOWERS_FAIL: return { ...state, loading: false }

        case GET_ALL_FOLLOWERS_POST_REQUEST: return { ...state, loading: true }
        case GET_ALL_FOLLOWERS_POST_SUCCESS: return { ...state, loading: false, allFollowersPost: payload }
        case GET_ALL_FOLLOWERS_POST_FAIL: return { ...state, loading: false }

        default: return state
    }
}