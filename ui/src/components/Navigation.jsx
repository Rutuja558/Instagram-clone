import React, { useEffect, useRef, useState } from 'react'
import { style } from '../styles/style.css'
import { Col, Dropdown, Form, Image, ListGroup, Nav, Navbar, Overlay, Popover, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { RiHeart3Line, RiMessengerLine, RiSettings3Line } from "react-icons/ri";
import { CgAddR, CgProfile } from "react-icons/cg";
import { FiCompass } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Login, Posts } from '../pages';
import { userLogout } from '../redux/actions/registerAction';
import { getSingleUser } from '../redux/actions/userAction';

export const Navigation = () => {
    const { login } = useSelector(state => state.register)
    const { allSuggestedUsers } = useSelector(state => state.user)
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [target, setTarget] = useState(null);
    const [target1, setTarget1] = useState(null);
    const [value, setValue] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null);
    const ref1 = useRef(null);
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    const handleNotification = (event) => {
        setNotification(!notification)
        setTarget1(event.target)
    }
    useEffect(() => {
        if (login) {
            navigate("/home")
        }
    }, [login])

    return (
        <>
            {!login
                ? <Login />
                :
                <>
                    <Row className='border-bottom'>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Navbar bg="white" variant="light" >
                                <Link to='/' className='navbar-brand insta-title'>Instagram</Link>
                                <Nav className="m-auto">
                                    <Form.Control type="text" className='form-control w-100' placeholder="&#xF002; search" style={{ "fontFamily": "FontAwesome" }} value={value} onChange={e => { setValue(e.target.value); }} onClick={handleClick}></Form.Control>
                                    <div ref={ref}>
                                        <Overlay
                                            show={show}
                                            target={target}
                                            placement="bottom"
                                            container={ref}
                                            containerPadding={20}
                                        >
                                            <Popover id="popover-contained" className='w-100'>
                                                <Popover.Body>
                                                    <ListGroup className='border-0'>
                                                        {allSuggestedUsers && allSuggestedUsers.filter(item => {
                                                            const search = value.toLowerCase();
                                                            const username = item.username.toLowerCase()
                                                            return search && username.startsWith(search) && username !== search
                                                        }).slice(0, 10).map(users => <ListGroup.Item className='border-0' onClick={e => { setValue(users.username); setShow(false); dispatch(getSingleUser(users._id)); navigate(`/profile/${users._id}`) }}>{users.username}</ListGroup.Item>)}
                                                    </ListGroup>
                                                </Popover.Body>
                                            </Popover>
                                        </Overlay>
                                    </div>
                                </Nav>
                                <Nav.Link ><Link to="/home"><MdHome size="1.8rem" color='black' /></Link> </Nav.Link>
                                <Nav.Link className='ms-4'><Link to='/messenger'><RiMessengerLine size="1.8rem" color='black' /></Link></Nav.Link>
                                <Nav.Link className='ms-4'><Link to='/posts'><CgAddR size="1.8rem" color='black' onClick={() => { setModalShow(true); }} /></Link></Nav.Link>
                                <Nav.Link className='ms-4'><Link to='/reels'><FiCompass size="1.8rem" color='black' /></Link></Nav.Link>
                                <Nav.Link className='ms-4'><RiHeart3Line size="1.8rem" color='black' onClick={handleNotification} /></Nav.Link>
                                <Nav.Link className='ms-4'> <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        {login.profile === "" ? <CgProfile size="1.8rem" color='black' /> : <Image src={`${process.env.REACT_APP_URL}/${login.profile}`} width={38} height={38} roundedCircle />}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item ><Link to="/profile"
                                            className='text-decoration-none text-dark'><CgProfile size="1.5rem" color='black' />profile</Link></Dropdown.Item>
                                        <Dropdown.Item ><Link to="/profile"
                                            className='text-decoration-none text-dark'><BsBookmark size="1.5rem" />Saved</Link></Dropdown.Item>
                                        <Dropdown.Item ><Link to='/editProfile' className='text-decoration-none text-dark'><RiSettings3Line size="1.5rem" />Setting</Link></Dropdown.Item>
                                        <Dropdown.Item className='border-top'
                                            onClick={e => { dispatch(userLogout()); navigate("/") }}
                                        >Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> </Nav.Link>
                            </Navbar>
                        </Col>
                    </Row>

                    <Posts modalShow={modalShow} setModalShow={setModalShow} />
                </>}
            <div ref={ref1}>
                <Overlay
                    show={notification}
                    target={target1}
                    placement="bottom"
                    container={ref1}
                    containerPadding={20}
                >
                    <Popover id="popover-contained1" style={{
                        width: "100%", height: "362px", overflowX: "hidden auto"
                    }}>
                        <Popover.Body >
                            All Notifications
                        </Popover.Body>
                    </Popover>
                </Overlay>
            </div >

        </>
    )
}
