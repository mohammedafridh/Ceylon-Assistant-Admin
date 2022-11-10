import React from 'react'
import UsersTop from '../../UsersContents/UsersTop'
import AddAdmin from './AddAdmin'
import AllAdmins from './AllAdmins'

const AdminPageSetup = () => {
  return (
    <div>
        <UsersTop />
        <AddAdmin />
        <AllAdmins />
    </div>
  )
}

export default AdminPageSetup