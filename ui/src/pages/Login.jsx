import React, { useEffect, useState } from 'react'
import { style } from "../styles/style.css";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Spinner } from "react-bootstrap";
import { Formik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../redux/actions/registerAction';
import { ConfirmPassword, ForgotPassword } from '../components';
import { createContext } from 'react';

export const LoginContext = createContext()
export const Login = () => {
    // const { usernameVerified } = useSelector(state => state.changePassword)
    const { loading, error, login } = useSelector(state => state.register)
    const [showError, setShowError] = useState(false)
    const [forgotPassword, setforgotPassword] = useState(false)
    const [confirmCard, setConfirmCard] = useState(false)
    const [loginCard, setLoginCard] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        username: yup.string().required("Please fill these field"),
        password: yup.string().required("Please Enter Your Password")
    });
    // useEffect(() => {
    //     if (usernameVerified) {
    //         setforgotPassword(false); setLoginCard(false); setConfirmCard(true)
    //     }
    // }, [usernameVerified])
    return (
        <>
            <Container>
                <Row>
                    <Col lg={{ span: 4, offset: 4 }} md={{ span: 8, offset: 2 }} sm={{ span: 10, offset: 1 }} xs={{ span: 12 }} className='mt-5'>
                        <LoginContext.Provider value={{ setLoginCard, setforgotPassword, setConfirmCard }}>
                            {forgotPassword && <ForgotPassword />}
                            {confirmCard && <ConfirmPassword />
                            }
                        </LoginContext.Provider>
                        {loginCard && <>
                            <Card className='card-log mt-5' >
                                <Card.Body className='px-5 pt-3'>
                                    <h1 className="insta-title text-center mb-5">Instagram</h1>
                                    <Button variant="primary" className='w-100'><i className="bi bi-facebook"></i> Log in with facebook</Button>
                                    <div className="or-border"></div>
                                    <span className="or">OR</span>
                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: '123'
                                        }}
                                        validationSchema={schema}
                                        onSubmit={(values, { resetForm }) => {
                                            dispatch(userLogin(values));
                                            if (error) {
                                                setShowError(true)
                                                setTimeout(() => {
                                                    setShowError(false)
                                                }, 2000);
                                            }
                                            if (login) {
                                                navigate("/posts");
                                                setTimeout(() => {
                                                    resetForm()
                                                }, 2000);
                                            }
                                        }}>
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            touched,
                                            values,
                                            errors,
                                        }) => (<Form onSubmit={handleSubmit}>
                                            {showError && <p className='text-danger'>Invalid email or password</p>}
                                            <FormGroup>
                                                <FormControl className="form-control mt-2" placeholder="Phone number ,username,or email" type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.username && !!touched.username}></FormControl>
                                                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl className="form-control mt-2" placeholder="Password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && !!touched.password}></FormControl>
                                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                            </FormGroup>
                                            <div className="text-end my-3"><Link to='' className="text-decoration-none" onClick={e => { setforgotPassword(true); setLoginCard(false) }}>Forgot
                                                Password?</Link></div>
                                            <Button type="submit" className="w-100" disabled={!errors.username && !errors.password ? false : true}>{loading && <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            } Log in</Button>
                                        </Form>)}
                                    </Formik>
                                </Card.Body>
                            </Card >
                            <Card className='mt-2 text-center p-2 card-log' > <p className=""> Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign up</Link></p>  </Card>
                        </>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
