import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/registerConstant';

export const userRegister = regi_data => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data: { result } } = await axios.post(`${process.env.REACT_APP_URL}/api/user/register`, regi_data)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error })
    }
}

export const userLogin = login_data => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const { data: { result } } = await axios.post(`${process.env.REACT_APP_URL}/api/auth/`, login_data)
        if (!result) {
            throw new Error("Inavlid email or password")
        }
        // localStorage.setItem("LocalLogin", JSON.stringify(result))
        dispatch({ type: USER_LOGIN_SUCCESS, payload: result })
    } catch (error) {
        console.log(error);
        dispatch({ type: USER_LOGIN_FAIL, payload: error })
    }
}

export const userLogout = () => async dispatch => {
    // localStorage.removeItem("localLogin")
    dispatch({ type: USER_LOGOUT })
}