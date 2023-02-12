import React, { useState } from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import './AddThingsToDo.css'
import AddThings from './AddThingsToDoContents/AddThings'
import ViewAddThings from './AddThingsToDoContents/ViewAddThings'

const AddThingsToDo = () => {
  const [formData,setFormData] = useState({})
  
  function getData(data) {
    setFormData(data)
  }
  return (
    <BaseLayout>
    <div className="addThingsToDo">
        <AddThings descriptionProp={formData.description} activityNameProp={formData.Activity} imageUrlProp={formData.image}/>
        <ViewAddThings sendData={getData}/>
    </div>
    </BaseLayout>
  )
}

export default AddThingsToDo