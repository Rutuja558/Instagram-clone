import axios from "axios"
import { CHECK_USERNAME_FAIL, CHECK_USERNAME_REQUEST, CHECK_USERNAME_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants/resetPasswordConstant"

export const checkUsername = username => async dispatch => {
    try {
        dispatch({ type: CHECK_USERNAME_REQUEST })
        const { data: { result } } = await axios.post(`${process.env.REACT_APP_URL}/api/auth/verify_username`, username)
        dispatch({ type: CHECK_USERNAME_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: CHECK_USERNAME_FAIL, payload: error })

    }
}

export const resetPassword = password => async (dispatch, getState) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        const { changePassword: { usernameVerified: { username, id } } } = getState()
        const config = {
            headers: { authorization: id }
        }
        await axios.put(`${process.env.REACT_APP_URL}/api/auth/resetPassword`, password, config)
        dispatch({ type: RESET_PASSWORD_SUCCESS })
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL })

    }
}