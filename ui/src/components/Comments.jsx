import React, { useState } from 'react'
import { Button, Col, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'
import { FiHeart, FiMessageCircle } from 'react-icons/fi'
import { RiBookmarkLine } from 'react-icons/ri'
import { TbSend } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, handlePostLiked } from '../redux/actions/postAction'

export const Comments = ({ setShow, show, post, id }) => {
    const { login } = useSelector(state => state.register)
    const [comment, setComment] = useState();
    const [change, setChange] = useState(false);
    const dispatch = useDispatch()
    return (
        <>{console.log(post._id)}
            <Modal closeButton
                show={show} size="lg" autoFocus={true}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body scrollable={true}>
                    <Row >
                        <Col lg={{ span: 6 }}>
                            <Image src={`${process.env.REACT_APP_URL}/${post.image}`} fluid className='w-sm-25'></Image>
                        </Col >
                        <Col lg={{ span: 6 }}>
                            <div className="user-info d-flex align-items-center">
                                <Image src={`${process.env.REACT_APP_URL}/${post.userId.profile}`} roundedCircle width={50} height={50} />
                                <p className='ms-3 fw-bold'>{post.userId.username}</p>
                                <button className='ms-auto btn border-0 fs-5 fw-bold'>...</button>
                            </div>
                            <p className='px-5 py-3 h-25'>{post.caption}</p>
                            {post.comments && post.comments.map(item => <div className="post-info d-flex align-items-center mt-2">
                                <Image src={`${process.env.REACT_APP_URL}/${item.reviewer.profile}`} roundedCircle width={40} height={40} />
                                <p className='ms-3 pe-1 fw-bold border-end border-dark'>{item.reviewer?.username}</p >
                                <p className='ps-1'>{item.comment} </p>
                            </div>)}
                            <div className='d-flex gap-3 mt-4'>
                                <div className="liked" onClick={e => { dispatch(handlePostLiked(post._id)); setChange(!change) }}>{post.likes.includes(login.id) ? <FaHeart size="1.8rem" className='text-danger' /> : <FiHeart size="1.8rem" />}
                                </div>
                                <div className="comment"
                                ><FiMessageCircle size="1.8rem" />
                                </div>
                                <div className="shared"><TbSend size="1.8rem" /></div>
                                <div className='saved ms-auto'><RiBookmarkLine size="1.8rem" /></div>
                            </div>
                            <div className="likes my-2">{post.likes.length} likes</div>
                            <InputGroup className='position-absolute bottom-0 end-0 w-50 border-top'>
                                <Form.Control placeholder='Add a comments...' type="text" className=' bg-white border-0 ps-4 pb-3' value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                                <Button variant='none' className='border-0 text-primary' onClick={e => dispatch(addComment(comment, post._id))} disabled={!comment ? true : false}>post</Button>
                            </InputGroup>
                        </Col >
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
