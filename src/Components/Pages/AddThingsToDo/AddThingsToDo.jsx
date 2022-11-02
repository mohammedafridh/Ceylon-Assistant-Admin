import React from 'react'
import './AddThingsToDo.css'
import AddThings from './AddThingsToDoContents/AddThings'
import ViewAddThings from './AddThingsToDoContents/ViewAddThings'

const AddThingsToDo = () => {
  return (
    <div className="addThingsToDo">
        <AddThings />
        <ViewAddThings />
    </div>
  )
}

export default AddThingsToDo