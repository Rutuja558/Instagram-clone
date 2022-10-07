import React, { useEffect } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowers } from '../redux/actions/followersAction'

export const Messenger = () => {
    const dispatch = useDispatch()
    const { login } = useSelector(state => state.register)
    const { allFollowers } = useSelector(state => state.followers)
    useEffect(() => {
        dispatch(getAllFollowers())
    }, [])

    return (
        <Row>
            <Col lg={{ span: 3, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12 }}>
                <Card >
                    {JSON.stringify(allFollowers)}
                    <Card.Body className='border-bottom border-secondary'>
                        <h5 className='text-center'>{login.username}</h5>
                    </Card.Body>
                    <Card.Body height={1000}>

                        {/* {allFollowers && allFollowers.following.map(user => <>
                            <div className="d-flex align-items-center gap-3 my-3">
                                <Image src={`${process.env.REACT_APP_URL}/${user.profile}`} roundedCircle width={50} height={50} />
                                <p>{user.username}</p>
                            </div>
                        </>)} */}
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={{ span: 4 }} md={{ span: 0 }} >
                <Card>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
