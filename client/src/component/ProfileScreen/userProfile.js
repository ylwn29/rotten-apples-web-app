import React, { useEffect } from 'react'
import UserCard from './userCard'
import UserDetail from './userDetail'
import UserLikedBook from './userLikedBook'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../actions/userActions'
import UserRecentReviewedBook from "./userRecentReviewedBook";
import UserOwnedBook from "./userOwnedBook";

const UserProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { user } = userProfile

    const deleteBook = useSelector(state => state.deleteBook)
    const { success: deleteBookSuccess } = deleteBook

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(getUserProfile())
        }
    }, [dispatch, userInfo, navigate, deleteBookSuccess])

    return (
        <>
            <div>
                <section className="header">
                    <div className="row">
                        <div className="col-4 pe-0">
                            <UserCard profile={user}/>
                        </div>
                        <div className="col-8 bg-blur">
                            <UserDetail user={user}/>
                            {userInfo && userInfo.role === 'writer' && user.ownedBooks && <UserOwnedBook books={user.ownedBooks}/>}
                            <UserRecentReviewedBook />
                            {user.likedBooks && <UserLikedBook books={user.likedBooks}/>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default UserProfile