import { CHECK_USERNAME_FAIL, CHECK_USERNAME_REQUEST, CHECK_USERNAME_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants/resetPasswordConstant"

export const passwordReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case CHECK_USERNAME_REQUEST: return { ...state, loading: true }
        case CHECK_USERNAME_SUCCESS: return { ...state, loading: false, usernameVerified: payload }
        case CHECK_USERNAME_FAIL: return { ...state, loading: false, error: payload }

        case RESET_PASSWORD_REQUEST: return { ...state, loading: true }
        case RESET_PASSWORD_SUCCESS: return { ...state, loading: false, passwordReset: true }
        case RESET_PASSWORD_FAIL: return { ...state, loading: false }

        default: return state
    }
}