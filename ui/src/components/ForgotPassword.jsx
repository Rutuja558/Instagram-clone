import React, { useContext, useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { VscLock } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginContext } from '../pages/Login';
import { checkUsername } from '../redux/actions/resetPasswordAction';

export const ForgotPassword = () => {
    const { loading, error, usernameVerified } = useSelector(state => state.changePassword)
    const { setLoginCard, setforgotPassword, setConfirmCard } = useContext(LoginContext)
    const dispatch = useDispatch()
    const [resetPassword, setResetPassword] = useState({
        username: ''
    })
    if (usernameVerified) {
        setforgotPassword(false)
        setConfirmCard(true)
    }
    return (
        <Card className='card-log mt-5' >
            <Card.Body className='px-5 pt-3'>
                <div className='text-center'>
                    <VscLock size="5rem" />
                    <h6>Trouble Logging In ?</h6>
                </div>
                <p className='text-center'>Enter your email or username and we'll send you a link to get back into your account.</p>
                {error && <p className='text-danger'>Invalid email</p>}
                <Form.Control type="text" placeholder='Email or Username' name="resetPassword" value={resetPassword.username} onChange={e => setResetPassword({ ...resetPassword, username: e.target.value })}></Form.Control>
                <Button type="submit" className="w-100 mt-3" disabled={!resetPassword ? true : false}
                    onClick={e => dispatch(checkUsername(resetPassword))}
                >{loading && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                    } Send</Button>
                <div className="or-border"></div>
                <span className="or">OR</span>
                <div className='text-center'>
                    <Link to="/signup" className="text-decoration-none ms-auto text-dark">Create New Account</Link>
                </div>
            </Card.Body>
            <Card.Footer className='text-center'> <Link to="/"
                onClick={e => { setforgotPassword(false); setLoginCard(true) }} className="text-decoration-none ms-auto text-dark ">Back to login</Link></Card.Footer>
        </Card >
    )
}
