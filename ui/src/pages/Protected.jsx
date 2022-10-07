import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Login } from './Login'

export const Protected = ({ element }) => {
    const { login } = useSelector(state => state.register)
    const navigate = useNavigate()
    return !login ? <Login /> : element
}
