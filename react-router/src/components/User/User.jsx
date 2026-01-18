import React from 'react'
import {useParams} from 'react-router-dom'

function User() {
    const {UserId} = useParams()
    return (
        <div className='bg-amber-500 text-3xl text-white text-center p-4 mx-2'>User : {UserId}</div>
    )
}

export default User
