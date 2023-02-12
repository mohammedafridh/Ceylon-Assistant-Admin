import React from 'react'
import BaseLayout from '../../../../Layouts/BaseLayout'
import UsersTop from '../../UsersContents/UsersTop'
import AddAdmin from './AddAdmin'
import AllAdmins from './AllAdmins'

const AdminPageSetup = () => {
  return (
    <BaseLayout>
    <div>
        <UsersTop />
        <AddAdmin />
        <AllAdmins />
    </div>
    </BaseLayout>
  )
}

export default AdminPageSetup