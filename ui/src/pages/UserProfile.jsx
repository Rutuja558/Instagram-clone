import React, { useEffect, useState } from 'react'
import { Button, Card, CloseButton, Col, Collapse, Image, Row, Tab, Tabs } from 'react-bootstrap'
import { FaUserCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineAddAPhoto, MdOutlineAddToPhotos, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { BsBookmark } from 'react-icons/bs'
import { getAllFollowers } from '../redux/actions/followersAction'
import { getAllPosts } from '../redux/actions/postAction'

export const UserProfile = () => {
    const [open, setOpen] = useState(false);
    const { allFollowers } = useSelector(state => state.followers)
    const { AllPosts } = useSelector(state => state.posts)
    const { allSuggestedUsers } = useSelector(state => state.user)
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllPosts(id))
        dispatch(getAllFollowers(id))
    }, [])

    return (
        <Row>
            <Col lg={{ span: 8, offset: 2 }}>
                {/* {JSON.stringify(AllPosts)} */}
                <Row className='py-4 border-bottom'>
                    {allFollowers && <>
                        <Col lg={{ span: 4 }} className='text-center '>
                            <Image src={`${process.env.REACT_APP_URL}/${allFollowers.clientId.profile}`} width={110} height={110} className='rounded-circle'></Image>
                        </Col>
                        <Col lg={{ span: 8 }}>
                            <div className='d-flex align-items-start gap-4'>
                                <p className='fs-4'>{allFollowers.clientId.username}</p>
                                <div className='d-flex align-items-start gap-2'>
                                    <Button className='bg-white text-dark rounded-0  border px-2 py-1 fw-semibold' onClick={e => navigate()}>Message</Button>
                                    <Button className='bg-white text-dark rounded-0  border px-3 py-1 fw-semibold' onClick={e => navigate()}><FaUserCheck /></Button>
                                    <Button className='bg-white text-dark rounded-0  border px-3 py-1 fw-semibold' onClick={e => setOpen(!open)}><MdOutlineKeyboardArrowUp /></Button>
                                    <Button className='bg-white text-dark rounded-0  border px-3 py-1 fw-semibold' onClick={e => navigate()} ><HiDotsHorizontal /></Button>
                                </div>
                            </div>
                            <div className="d-flex gap-5">
                                <p className='posts'><strong>0</strong> posts</p>
                                <p className='followers'><strong>111</strong> followers</p>
                                <p className='following'><strong>123</strong> following</p>
                            </div>
                            <div>
                                <p className="fw-semibold mb-0">{allFollowers.clientId.fullName}</p>
                                <p>{allFollowers.clientId.bio}</p>
                            </div>
                        </Col>
                    </>}
                </Row>
                <Row>
                    <Col lg={{ span: 12 }} >
                        <Collapse in={open}>
                            <Card>
                                <Card.Body>
                                    <h6 className='text-secondary'>Suggested</h6>
                                    <Row>
                                        {allSuggestedUsers.map(user => <Col lg={{ span: 3 }}>
                                            <Card className='p-3'>
                                                <Image src={`${process.env.REACT_APP_URL}/${user.profile}`} width={45} height={45} className='rounded-circle m-auto mb-3'></Image>
                                                <h5 className='m-auto'>{user.username}</h5>
                                                <p className='m-auto'>{user.fullName}</p>
                                                <Button className='w-75 m-auto mt-2'>Follow</Button>
                                            </Card>
                                        </Col>)}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Collapse>
                    </Col>
                    <Col lg={{ span: 10, offset: 1 }} >
                        <Tabs fill
                            defaultActiveKey="posts"
                            id="uncontrolled-tab-example"
                            className=" m-auto w-50 mb-3 text-center "
                        >
                            <Tab className='text-dark my-5' eventKey="posts" title="POSTS">

                                {AllPosts.length === 0 && <h4 className='text-center'>No Post Yet</h4>}
                                {AllPosts?.map(item => <Image src={`${process.env.REACT_APP_URL}/${item.image}`} width={200} height={200} ></Image>)}
                            </Tab>
                            <Tab className='text-dark my-5' eventKey="saved" title="REELS">
                                <h4 className='text-center'>No Post Yet</h4>
                            </Tab>
                            <Tab className='text-dark text-center my-5' eventKey="tagged" title="TAGGED" >
                                <h4>No Post Yet</h4>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col >
        </Row >
    )
}
