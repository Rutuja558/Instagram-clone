import React, { useContext, useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginContext } from '../pages/Login';
import { resetPassword } from '../redux/actions/resetPasswordAction';

export const ConfirmPassword = () => {
    const { loading, error } = useSelector(state => state.register)
    const { setLoginCard, setConfirmCard } = useContext(LoginContext)
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState({
        password: "",
        confirmPass: ""
    })
    const handleSubmit = () => {
        if (confirmPassword.password !== confirmPassword.confirmPass) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        }
        else {
            setConfirmCard(false)
            setLoginCard(true)
            dispatch(resetPassword(confirmPassword))
        }
    }
    return (
        <Card className='card-log mt-5' >
            <Card.Body className='px-5 pt-3'>
                <h5>Reset Password</h5>
                <Form.Label className='mt-3'>New Password</Form.Label>
                <Form.Control type="password" placeholder='New Password' value={confirmPassword.password} onChange={e => setConfirmPassword({ ...confirmPassword, password: e.target.value })}></Form.Control>
                <Form.Label className='mt-3'>New Password Confirmation</Form.Label>
                <Form.Control type="password" placeholder='New Password' value={confirmPassword.confirmPass} onChange={e => setConfirmPassword({ ...confirmPassword, confirmPass: e.target.value })}></Form.Control>
                {showAlert && <p class="text-danger">
                    Password and Confirm Password does not matched
                </p>}
                <Button type="submit" className=" mt-3" onClick={e => handleSubmit()}>{loading && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                } Reset Password</Button>
                <div className="or-border"></div>
                <span className="or">OR</span>
                <div className='text-center'>
                    <Link to="/signup" className="text-decoration-none ms-auto text-dark">Create New Account</Link>
                </div>
            </Card.Body>
            <Card.Footer className='text-center'> <Link to="/" onClick={e => {
                setConfirmCard(false); setLoginCard(true)
            }} className="text-decoration-none ms-auto text-dark ">Back to login</Link></Card.Footer>
        </Card >
    )
}
