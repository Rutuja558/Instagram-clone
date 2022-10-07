import axios from "axios"
import { FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_ALL_FOLLOWERS_FAIL, GET_ALL_FOLLOWERS_POST_FAIL, GET_ALL_FOLLOWERS_POST_REQUEST, GET_ALL_FOLLOWERS_POST_SUCCESS, GET_ALL_FOLLOWERS_REQUEST, GET_ALL_FOLLOWERS_SUCCESS } from "../constants/followersConstant"

export const handleFollow = usersID => async (dispatch, getState) => {
    try {
        dispatch({ type: FOLLOW_USER_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/user/follow`, { usersID }, config)
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: FOLLOW_USER_FAIL })
    }
}
export const getAllFollowers = id => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_FOLLOWERS_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { result } } = await axios.get(`${process.env.REACT_APP_URL}/api/user/allFollowers/${id}`, config)
        dispatch({ type: GET_ALL_FOLLOWERS_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: GET_ALL_FOLLOWERS_FAIL })
    }
}
export const getAllFollowersPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_FOLLOWERS_POST_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { result } } = await axios.get(`${process.env.REACT_APP_URL}/api/user/followers-post`, config)
        dispatch({ type: GET_ALL_FOLLOWERS_POST_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: GET_ALL_FOLLOWERS_POST_FAIL })
    }
}