import axios from "axios"
import { DEACTIVATE_ACCOUNT_FAIL, DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/userConstant";

export const getSingleUser = id => async (dispatch, getState) => {
    try {
        console.log(id);
        dispatch({ type: GET_SINGLE_USER_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { combined } } = await axios.get(`${process.env.REACT_APP_URL}/api/user/profile/${id}`, config)
        dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: combined })
    } catch (error) {
        dispatch({ type: GET_SINGLE_USER_FAIL, payload: error })
    }
}
export const getAllSuggestedUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_USERS_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { result } } = await axios.get(`${process.env.REACT_APP_URL}/api/user/allUsers`, config)
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: GET_ALL_USERS_FAIL, payload: error })
    }
}
export const updateUser = (user_data, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { result } } = await axios.put(`${process.env.REACT_APP_URL}/api/user/edit/${id}`, user_data, config)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error })
    }
}
export const deactivatAccount = info => async (dispatch, getState) => {
    try {
        dispatch({ type: DEACTIVATE_ACCOUNT_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        await axios.put(`${process.env.REACT_APP_URL}/api/user/deactivate/${info.id}`, info, config)
        dispatch({ type: DEACTIVATE_ACCOUNT_SUCCESS })
    } catch (error) {
        dispatch({ type: DEACTIVATE_ACCOUNT_FAIL, payload: error })
    }
}