import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister } from '../redux/actions/registerAction'

export const SignUp = () => {
    const { loading } = useSelector(state => state.register)
    const [uploadProfile, setUploadProfile] = useState("profiles/default.jpg")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const schema = yup.object().shape({
        email: yup.string().required("Please Enter Your email"),
        fullName: yup.string().required("Please Enter Your Full Name"),
        username: yup.string().required("Please Choose Your username"),
        password: yup.string().required("Please Choose Your Password")
    });
    const handleProfileUpload = e => {
        setUploadProfile(e.target.files[0])
    }
    return (
        <>
            <Container>
                <Row className="mt-5">
                    <Col lg={{ span: 4, offset: 4 }} md={{ span: 10 }} sm={{ span: 10, offset: 1 }} xs={{ span: 12 }} className="mt-3">
                        <Card >
                            <Card.Body className="px-5 pt-3 ">
                                <h1 className="insta-title text-center mb-2">Instagram</h1>
                                <p className="text-center">Sign up to see photos and videos from your friends.</p>
                                <Button variant="primary" className='w-100'><i className="bi bi-facebook"></i> Log in with facebook</Button>
                                <div className="or-border"></div>
                                <span className="or">OR</span>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        fullName: '',
                                        username: '',
                                        password: '123'
                                    }}
                                    validationSchema={schema}
                                    onSubmit={values => {
                                        const fd = new FormData()
                                        fd.append("email", values.email)
                                        fd.append("fullName", values.fullName)
                                        fd.append("username", values.username)
                                        fd.append("password", values.password)
                                        fd.append("profile", uploadProfile)
                                        dispatch(userRegister(fd))
                                        navigate("/")
                                    }}
                                >{({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    errors,
                                    touched
                                }) => (<Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <FormControl className="form-control" placeholder="Mobile number or email" type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email && !!touched.email}></FormControl>
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl className="form-control mt-2" placeholder="Full Name" type="text" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fullName && !!touched.fullName}></FormControl>
                                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl className="form-control mt-2" placeholder="Username" type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.username && !!touched.username}></FormControl>
                                        <Form.Control.Feedback type="invalid">{!!errors.username}</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl className="form-control mt-2" placeholder="Password" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && !!touched.password}></FormControl>
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </FormGroup>
                                    <Form.Group className="mb-3" controlId="formBasicFile">
                                        <Form.Label className='alert-secondary w-100 px-3 py-2 rounded-2 text-dark'>Upload Profile</Form.Label>
                                        <Form.Control type="file" onChange={handleProfileUpload} style={{ "display": "none" }} ></Form.Control>
                                    </Form.Group>
                                    <p className="signup-para text-center mt-3">People who use our service may have uploaded your contact information to instagram. Learn More</p>
                                    <p className="signup-para text-center">By signing up, you agree to our Terms ,Privacy Policy and Cookies Policy</p>
                                    <Button type="submit" className="w-100" disabled={!errors.email && !errors.fullName && !errors.username && !errors.password ? false : true} >{loading && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    }Sign up</Button>
                                </Form>)}
                                </Formik>
                            </Card.Body>
                        </Card>
                        <Card Body className='mt-2 text-center p-2' > <p> Already have an account? <Link to="/" className="text-decoration-none fw-bold">Log in</Link></p>  </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
