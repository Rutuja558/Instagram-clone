import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import { addPost } from "../redux/actions/postAction";

export const Posts = ({ modalShow, setModalShow }) => {
    const navigate = useNavigate()
    const { login } = useSelector(state => state.register)
    const dispatch = useDispatch()
    const [uploadPost, setUploadPost] = useState()
    const [postCaption, setpostCaption] = useState()
    const [iamgeURL, setiamgeURL] = useState()
    const handlechange = e => {
        setUploadPost(e.target.files[0])
        let file = URL.createObjectURL(e.target.files[0])
        setiamgeURL(file)
    }
    // useEffect(() => {
    //     if (!modalShow) {
    //         setUploadPost()
    //         setpostCaption()
    //         navigate("/home")
    //     }
    // }, [modalShow])
    const handlePost = e => {
        const fd = new FormData()
        fd.append("image", uploadPost)
        fd.append("caption", postCaption)
        dispatch(addPost(fd))
        setiamgeURL()
        setTimeout(() => {
            setModalShow(false)
            navigate("/home")
            setpostCaption()
        }, 1000);
    }
    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false); setiamgeURL(); setpostCaption(); navigate("/home")
                }}
                size="lg"
                centered animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        <p className='text-center fs-5'> Create new post</p>
                    </Modal.Title>
                </Modal.Header>
                {!iamgeURL
                    ? <Modal.Body className='p-5 text-center vh-75 my-5'>
                        <FaPhotoVideo size={"5em"} />
                        <p>   Drag photos and videos here</p>
                        <Form.Group className="mb-3" controlId="formBasicFile">
                            <Form.Label className='bg-primary px-3 py-2 rounded-2 text-white'>Select from computer</Form.Label>
                            <Form.Control type="file" onChange={handlechange} style={{ "display": "none" }} accept="image/"></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    : <Modal.Body>
                        <Row>
                            <Col sm={{ span: 7 }}>
                                <Image src={iamgeURL} className="w-100" height={500}></Image>
                            </Col>
                            <Col sm={{ span: 5 }}>
                                <div className="d-flex align-items-center text-start mt-3">
                                    <Image src={`${process.env.REACT_APP_URL}/${login.profile}`} roundedCircle width={40} height={40} />
                                    <h5 className="ms-2">{login.username}</h5>
                                </div>
                                <Form>
                                    <Form.Control type='text' as="textarea" rows={4} placeholder='Write a caption...' className='bg-white border-0 mt-3' name='caption' value={postCaption} onChange={e => setpostCaption(e.target.value)}></Form.Control>
                                </Form>
                                <Button className='w-100 mt-3'
                                    onClick={e => handlePost()}
                                >Post</Button>
                            </Col>
                        </Row>
                    </Modal.Body>}

            </Modal>

        </>
    )
}