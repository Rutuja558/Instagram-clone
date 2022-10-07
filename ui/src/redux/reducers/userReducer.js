import { DEACTIVATE_ACCOUNT_FAIL, DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/userConstant"

export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GET_ALL_USERS_REQUEST: return { ...state, loading: true }
        case GET_ALL_USERS_SUCCESS: return { ...state, loading: false, allSuggestedUsers: payload }
        case GET_ALL_USERS_FAIL: return { ...state, loading: false, error: payload }

        case GET_SINGLE_USER_REQUEST: return { ...state, loading: true }
        case GET_SINGLE_USER_SUCCESS: return { ...state, loading: false, myProfile: payload }
        case GET_SINGLE_USER_FAIL: return { ...state, loading: false, error: payload }

        case UPDATE_USER_REQUEST: return { ...state, loading: true }
        case UPDATE_USER_SUCCESS: return { ...state, loading: false, updatedUser: payload }
        case UPDATE_USER_FAIL: return { ...state, loading: false }

        case DEACTIVATE_ACCOUNT_REQUEST: return { ...state, loading: true }
        case DEACTIVATE_ACCOUNT_SUCCESS: return { ...state, loading: false, deactivated: true }
        case DEACTIVATE_ACCOUNT_FAIL: return { ...state, loading: false }
        default: return state
    }
}