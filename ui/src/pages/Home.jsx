import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Collapse, Form, Image, InputGroup, Row } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa';
import { FiHeart, FiMessageCircle } from 'react-icons/fi'
import { RiBookmarkLine } from 'react-icons/ri';
import { TbSend } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { Comments, Suggestions } from '../components';
import { addComment, getAllPosts, handlePostLiked } from '../redux/actions/postAction';
import { Login } from './Login';
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { getAllFollowersPosts } from '../redux/actions/followersAction';

export const Home = () => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState();
    const dispatch = useDispatch()
    const { login } = useSelector(state => state.register)
    const { AllPosts, likeMessage, commentMessage } = useSelector(state => state.posts)
    const { followMessage, allFollowersPost } = useSelector(state => state.followers)
    let iterator = allFollowersPost.values()
    let followersPost = []
    if (allFollowersPost) {
        for (let elements of iterator) {
            followersPost = elements
        }
    }
    const merged = [...AllPosts, ...followersPost]
    useEffect(() => {
        dispatch(getAllPosts(login.id))
        dispatch(getAllFollowersPosts())
    }, [likeMessage, followMessage, commentMessage])
    return (
        <>
            {/* {JSON.stringify(AllPosts)} */}
            <Row>
                {/* {console.warn(allFollowersPost)} */}
                <Col lg={{ span: 4, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12 }}>
                    {merged.length === 0 && <Card.Body>
                        <h4 className='mt-4'>Not posted yet</h4>
                    </Card.Body>}
                    {merged.map((post, index) => <Card className='my-2'>
                        <Card.Body>
                            <div id="Posts">
                                <div className="user-info d-flex align-items-center">
                                    <Image src={`${process.env.REACT_APP_URL}/${post.userId.profile}`} roundedCircle width={50} height={50} />
                                    <p className='ms-3'>{post.userId.username}</p>
                                    <button className='ms-auto btn border-0 fs-5 fw-bold'><HiDotsHorizontal /></button>
                                </div>
                                <div className="post" >
                                    <Image src={`${process.env.REACT_APP_URL}/${post.image}`} className='w-100 my-2' />
                                </div>
                                <div className='d-flex gap-3 '>
                                    <div className="liked"
                                        onClick={e => { dispatch(handlePostLiked(post._id)) }
                                        }
                                    >{post.likes.includes(login.id) ? <FaHeart size="1.8rem" className='text-danger' /> : <FiHeart size="1.8rem" />}
                                    </div>
                                    <div className="comment" data-bs-toggle="collapse" data-bs-target={`collapse-${index}`} onClick={() => {
                                        // setShow(true)
                                        setOpen(!open)
                                    }}
                                    ><FiMessageCircle size="1.8rem" />
                                    </div>
                                    <div className="shared"><TbSend size="1.8rem" /></div>
                                    <div className='saved ms-auto'><RiBookmarkLine size="1.8rem" /></div>
                                </div>
                                <div className="likes my-1">{post.likes.length} likes</div>
                                <div className="caption"><span className='fw-bold me-1'>{post.userId.username}</span>{post.caption}</div>
                                <div className="commentCount text-muted">View {post.comments.length} comments</div>

                                <Collapse in={open} scrollable={true} onHeightReady={{ height: 20 }}>
                                    <div id="example-collapse-text">
                                        {post.comments && post.comments.map(item => <div className="post-info d-flex align-items-center mt-2">
                                            <Image src={`${process.env.REACT_APP_URL}/${item.reviewer.profile}`} roundedCircle width={40} height={40} />
                                            <p className='ms-3 pe-1 fw-bold border-end border-dark'>{item.reviewer?.username}</p >
                                            <p className='ps-1'>{item.comment} </p>
                                        </div>)}
                                    </div>
                                </Collapse>

                                <InputGroup className='border-top mt-3'>
                                    <Form.Control placeholder='Add a comments...' type="text" className=' bg-white border-0' value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                                    <Button variant='none' className='border-0 text-primary' onClick={e => { dispatch(addComment(comment, post._id)); setComment() }} disabled={!comment ? true : false}>post</Button>
                                </InputGroup>
                            </div>
                        </Card.Body>
                    </Card>)}
                </Col>
                <Col lg={{ span: 3 }} className="mt-2 d-md-none d-lg-block">
                    <Card>
                        <Card.Body>
                            <Suggestions />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
