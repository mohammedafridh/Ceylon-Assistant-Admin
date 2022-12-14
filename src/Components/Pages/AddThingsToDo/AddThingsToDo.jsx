import React, { useState } from 'react'
import './AddThingsToDo.css'
import AddThings from './AddThingsToDoContents/AddThings'
import ViewAddThings from './AddThingsToDoContents/ViewAddThings'

const AddThingsToDo = () => {
  const [formData,setFormData] = useState({})
  
  function getData(data) {
    setFormData(data)
  }
  return (
    <div className="addThingsToDo">
        <AddThings descriptionProp={formData.description} activityNameProp={formData.Activity} imageUrlProp={formData.image}/>
        <ViewAddThings sendData={getData}/>
    </div>
  )
}

export default AddThingsToDo