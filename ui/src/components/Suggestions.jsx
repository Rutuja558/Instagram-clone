import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowers, handleFollow } from '../redux/actions/followersAction'
import { getAllSuggestedUsers } from '../redux/actions/userAction'

export const Suggestions = () => {
    const { login } = useSelector(state => state.register)
    const { allSuggestedUsers } = useSelector(state => state.user)
    const { followMessage } = useSelector(state => state.posts)
    const { allFollowers } = useSelector(state => state.followers)
    // console.log(allFollowers);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSuggestedUsers())
        dispatch(getAllFollowers())
    }, [login, followMessage])
    return (
        <>
            {/* {JSON.stringify(allFollowers.following)} */}
            <div className="d-flex gap-4 align-items-center">
                <Image src={`${process.env.REACT_APP_URL}/${login.profile}`} width={70} height={70} roundedCircle className='border border-secondary p-1' />
                <div>
                    <h6 className='mb-0'>{login.username}</h6>
                    <span className='text-secondary'>{login.name}</span>
                </div>
            </div>
            <p className="text-secondary fw-bold my-1">Suggestions For You</p>
            {allSuggestedUsers && allSuggestedUsers.map(user => <div className="d-flex gap-2 align-items-center mt-2">
                {/* {console.log(user)} */}
                <Image src={`${process.env.REACT_APP_URL}/${user.profile}`} roundedCircle width={40} height={40} />
                <div>
                    <h6 className='mb-0'>{user.username}</h6>
                    <span className='text-secondary mt-0 suggestion'>Suggested for you</span>
                </div>
                <button className='ms-auto btn border-0 text-primary fw-bold' onClick={e => dispatch(handleFollow(user._id))}>
                    {!allFollowers.following?.includes(user._id) ? <p>follow</p> : <p>following</p>}
                    {/* dd */}
                    {/* {JSON.stringify(allFollowers.following)} */}

                </button>
            </div>)}
        </>
    )
}
