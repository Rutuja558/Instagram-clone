import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Nav, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { deactivatAccount, getSingleUser, updateUser } from '../redux/actions/userAction'
import { Link, useNavigate } from 'react-router-dom'

export const EditProfile = () => {
    const { myProfile, updatedUser, deactivated } = useSelector(state => state.user)
    const [editProfile, setEditProfile] = useState(myProfile?.profile)
    const [deactiveAccount, setDeactiveAccount] = useState(false)
    const { login } = useSelector(state => state.register)
    const [confirmation, setConfirmation] = useState({
        reason: null,
        password: null,
        id: myProfile._id
    })
    const [imageURL, setImageURL] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getSingleUser(login.id))
    }, [updatedUser])
    const handleEditProfile = e => {
        setEditProfile(e.target.files[0])
        let file = URL.createObjectURL(e.target.files[0])
        setImageURL(file)
    }
    // console.warn(setEditProfile);
    return (
        <div className="alert-secondary">
            <Row>
                <Col lg={{ span: 8, offset: 2 }} md={{ span: 2 }} sm={{ span: 0 }}>
                    {/* {JSON.stringify(myProfile)} */}
                    <Row className='mt-5'>
                        <Col lg={{ span: 3 }}>
                            <Card >
                                <Nav className="me-auto" fixed="start">
                                    <ListGroup>
                                        <Nav.Link className='text-dark mb-3'>Edit Profile</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Change Password</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Apps and websites</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Email notification</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Push notification</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Manage contacts</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Privacy and security</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Login activity</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Emails from Instagram</Nav.Link>
                                        <Nav.Link className='text-dark mb-3'>Help</Nav.Link>
                                        <Nav.Link className='text-dark mb-5 mt-5'>
                                            <h6 className='text-primary'>Account Center</h6>
                                            <p>Control settings for coonected experience across instagram, the Facebook app and Messenger, including story and post sharing and logging in.</p>
                                        </Nav.Link>
                                    </ListGroup>
                                </Nav>
                            </Card>
                        </Col>
                        <Col lg={{ span: 9 }} md={{ span: 10 }} sm={{ span: 12 }}>


                            <Card className='px-5'>
                                {!deactiveAccount
                                    ?
                                    <Formik
                                        initialValues={{
                                            fullName: myProfile?.fullName,
                                            username: myProfile?.username,
                                            website: myProfile?.website,
                                            Bio: myProfile?.Bio,
                                            email: myProfile?.email,
                                            phone: myProfile?.phone,
                                            gender: myProfile?.gender
                                        }}
                                        onSubmit={values => {

                                            const fd = new FormData()
                                            fd.append("fullName", values.fullName)
                                            fd.append("username", values.username)
                                            fd.append("website", values.website)
                                            fd.append("Bio", values.Bio)
                                            fd.append("email", values.email)
                                            fd.append("phone", values.phone)
                                            fd.append("gender", values.gender)
                                            fd.append("profile", editProfile)
                                            console.log(fd);
                                            dispatch(updateUser(fd, myProfile._id))
                                        }}
                                    >{({
                                        handleSubmit,
                                        handleChange,
                                        values
                                    }) => (<Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }}>
                                                {!imageURL
                                                    ? <Image className='rounded-circle' src={`${process.env.REACT_APP_URL}/${myProfile?.profile}`} width={65} height={65} />
                                                    : <Image className='rounded-circle' src={imageURL} width={65} height={65} />
                                                }
                                            </Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }}>
                                                <h5 className='mb-0'>{myProfile?.username}</h5>
                                                <Form.Label htmlFor='profile' className='text-primary fw-semibold'>Change profile photo</Form.Label>
                                                <Form.Control type="file" id='profile' onChange={handleEditProfile} style={{ "display": "none" }} ></Form.Control>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }}>
                                                <Form.Label htmlFor='fullName'>Name</Form.Label>  </Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }}><Form.Control type="text" id='fullName' name='fullName' className=' bg-white' placeholder='Name' value={values.fullName} onChange={handleChange} />
                                                <Form.Text className="text-muted">
                                                    <p className='mt-2'> Help people discover your account by using the name you're known by: either your full name,nickname, or business name.</p>
                                                    <p>You can only change your name twice within 14 days.</p>
                                                </Form.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='username'>Username</Form.Label>
                                            </Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="text" id='username' name='username' placeholder="Username" className=' bg-white' value={values.username} onChange={handleChange} />
                                                <Form.Text className="text-muted">
                                                    <p className='mt-2'>  In most cases, you'll be able to change your username back to {myProfile?.username} for another 14 days. <a href="">Learn more</a>  </p>
                                                </Form.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='website'>Website</Form.Label>  </Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="text" id='website' name='website' placeholder="Website" className=' bg-white' value={values.website} onChange={handleChange} /> </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='Bio'>Bio</Form.Label></Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="text" id='Bio' name='Bio' placeholder="Bio" className=' bg-white' value={values.Bio} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >

                                            </Col>
                                            <Col className='mt-5' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >

                                                <Form.Text>
                                                    <h6>Personal information</h6>
                                                    <p>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
                                                </Form.Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='email'>Email</Form.Label></Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="email" id='email' name='email' placeholder="Email" className=' bg-white' value={values.email} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='phone'>Phone </Form.Label></Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="number" id='phone' name='phone' placeholder="Phone Number" className=' bg-white' value={values.phone} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label htmlFor='gender'>Gender </Form.Label></Col>
                                            <Col className='mt-3' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Control type="text" id='gender' name='gender' placeholder="Gender" className=' bg-white' value={values.gender} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className='mt-3' lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} >
                                                <Form.Label>Similar account suggestions </Form.Label></Col>
                                            <Col className='mt-3 mb-5' lg={{ span: 9 }} md={{ span: 3 }} sm={{ span: 9 }} >
                                                <Form.Check aria-label="option 1" label='Include your acccount when recommending similar accounts people might want to follow.' />
                                            </Col>
                                            <Row>
                                                <Col lg={{ span: 3, offset: 3 }} md={{ span: 3 }} sm={{ span: 3 }}>
                                                    <Button type='submit'>Submit</Button>
                                                </Col>
                                                <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }}>
                                                    <h6 className='text-primary'
                                                        onClick={e =>
                                                            setDeactiveAccount(true)
                                                        }>Temporarily deactivate my account</h6>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </Form>)}</Formik>
                                    : <>
                                        <div className="border-bottom mb-3">
                                            <h4 className='mt-3'>Temporarily Dactivate Your Account</h4>
                                            <p>Hi <strong>{myProfile?.username} ,</strong></p>
                                            <p>You can deactivate your account instead of deleting it. This means your account will be hidden until you reactive it by logging back in. </p>
                                            <p>You can only deactive your account once a week.</p>
                                        </div>
                                        <div className="border-bottom mb-3">
                                            <h5 className='mb-3'>Keeping your data safe</h5>
                                            <p className='mb-4'>Nothing is more important to us than the safety and security of the Instagram community.People put their trust in us sharing moments of their lives on Instagram. So we wil never make any compromises when it comes to safeguarding your data.</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <Form.Label htmlFor='reason'>Why you are deactivating your account?</Form.Label>
                                            <Form.Select id='reason' className='me-4' name='reason' value={confirmation.reason} onChange={e => setConfirmation({ ...confirmation, reason: e.target.value })}>
                                                <option>Select</option>
                                                <option value="Create a second account">Create a second account</option>
                                                <option value="Trouble getting started">Trouble getting started</option>
                                                <option value="Privacy concerns">Privacy concerns</option>
                                                <option value="Too busy/too distracting">Too busy/too distracting</option>
                                                <option value="Just need a break">Just need a break</option>
                                                <option value="Want to remove something">Want to remove something</option>
                                                <option value="Too many ads">Too many ads</option>
                                                <option value="Concerned about my data">Concerned about my data</option>
                                                <option value="Can't find people to follow">Can't find people to follow</option>
                                                <option value="Something else">Something else</option>
                                            </Form.Select>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 pb-5 border-bottom">
                                            <Form.Label htmlFor='password'>To continue,please re-enter your password</Form.Label>
                                            <Form.Control type='password' className='bg-white me-5 ' id='password ' name='password' value={confirmation.password} onChange={e => setConfirmation({ ...confirmation, password: e.target.value })}></Form.Control>
                                        </div>
                                        <p className='mt-5'>When your press the button below,your photos, comments and likes will be hidden until you reactive your account by logging back in.</p>
                                        <Button className='w-50 mb-5' disabled={!(confirmation.password && confirmation.reason) ? true : false} onClick={e => {
                                            dispatch(deactivatAccount(confirmation)); if (deactivated) {
                                                navigate("/")
                                            }
                                        }}>Temporarily Deactivate Account</Button>
                                    </>
                                }

                            </Card>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}
