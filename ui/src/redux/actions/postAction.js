import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, GET_LOGIN_USER_POST_FAIL, GET_LOGIN_USER_POST_REQUEST, GET_LOGIN_USER_POST_SUCCESS, HANDLE_LIKE_FAIL, HANDLE_LIKE_REQUEST, HANDLE_LIKE_SUCCESS } from "../constants/postConstant"
import axios from "axios"

export const addPost = fd => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_POST_REQUEST })
        const { register: { login: { id, token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/user/post/${id}`, fd, config)
        // console.log(data);
        dispatch({ type: ADD_POST_SUCCESS, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_POST_FAIL, payload: error })

    }
}
export const getAllPosts = id => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_LOGIN_USER_POST_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data: { allPosts } } = await axios.get(`${process.env.REACT_APP_URL}/api/user/post/${id}`, config)
        // console.log(allPosts);
        dispatch({ type: GET_LOGIN_USER_POST_SUCCESS, payload: allPosts })
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_LOGIN_USER_POST_FAIL, payload: error })

    }
}
export const handlePostLiked = postId => async (dispatch, getState) => {
    try {
        dispatch({ type: HANDLE_LIKE_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/user/like`, { postId }, config)
        dispatch({ type: HANDLE_LIKE_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: HANDLE_LIKE_FAIL, payload: error })
    }
}
export const addComment = (comment, postId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_COMMENT_REQUEST })
        const { register: { login: { token } } } = getState()
        const config = {
            headers: { authorization: token }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/user/comment`, { comment, postId }, config)
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: ADD_COMMENT_FAIL, payload: error })
    }
}