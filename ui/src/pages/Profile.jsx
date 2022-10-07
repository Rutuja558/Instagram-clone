import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser } from '../redux/actions/userAction'
import { MdOutlineAddAPhoto, MdOutlineAddToPhotos } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import { getAllFollowers } from '../redux/actions/followersAction';
import { getAllPosts } from '../redux/actions/postAction';

export const Profile = () => {
    // const [activeKey, setActiveKey] = useState("posts")
    const { allFollowers } = useSelector(state => state.followers)
    const { AllPosts } = useSelector(state => state.posts)
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
                                <Button className='bg-white text-dark rounded-0  border px-2 py-1 fw-semibold' onClick={e => navigate("/editProfile")}> Edit Profile</Button>
                            </div>
                            <div className="d-flex gap-5">
                                <p className='posts'><strong>0</strong> posts</p>
                                <p className='followers'><strong>111</strong> followers</p>
                                <p className='following'><strong>{allFollowers.following?.length}</strong> following</p>
                            </div>
                            <div>
                                <p className="fw-semibold mb-0">{allFollowers.clientId.fullName}</p>
                                <p>{allFollowers.clientId.bio}</p>
                            </div>
                        </Col>
                    </>}
                </Row>
                <Row>
                    <Col lg={{ span: 10, offset: 1 }} >
                        <Tabs
                            defaultActiveKey="posts"
                            id="uncontrolled-tab-example"
                            className=" ms-auto w-100 mb-3 text-center gap-4"
                        >
                            <Tab className='text-dark my-5' eventKey="posts" title="posts">

                                {AllPosts.length === 0 && <div className='text-center'><MdOutlineAddToPhotos size="3rem" />
                                    <div className="fs-3 text-secondary my-2">Photos of you</div>
                                    <p>When you add your photo's ,they'll appear here.</p></div>
                                }
                                {AllPosts?.map(item => <Image src={`${process.env.REACT_APP_URL}/${item.image}`} width={200} height={200} ></Image>)}

                            </Tab>
                            <Tab className='text-dark text-center my-5' eventKey="saved" title="saved">
                                <BsBookmark size="3rem" />
                                <div className="fs-3 text-secondary my-2">Photos of you</div>
                                <p>When you saved photo's ,they'll appear here.</p>
                            </Tab>
                            <Tab className='text-dark text-center my-5' eventKey="tagged" title="tagged" >
                                <MdOutlineAddAPhoto size="3rem" />
                                <div className="fs-3 text-secondary my-2">Photos of you</div>
                                <p>When people tag you in photo's ,they'll appear here.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col >
        </Row >
    )
}
