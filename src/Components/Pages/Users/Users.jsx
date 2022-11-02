import React from 'react'
import './Users.css'
import AllAdmins from './UsersContents/AllAdmins'
import AllGuides from './UsersContents/AllGuides'
import AllTourists from './UsersContents/AllTourists'
import UsersTop from './UsersContents/UsersTop'

const Users = () => {
  return (
    <div className = 'users'>
        <UsersTop />
        <AllAdmins />
        <AllGuides />
        <AllTourists />
    </div>
  )
}

export default Users