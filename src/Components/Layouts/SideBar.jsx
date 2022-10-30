import React from 'react'
import './SideBar.css'
import {HelpCenter, People, PlaylistAddCheck, TimeToLeave,TravelExplore,Collections, Mail, Home} from '@mui/icons-material';
import {Link} from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="sideBar">
        <div className="sideBarWrapper">
            <div className="sideBarMenu">
                <h3>Dashboard</h3>
                <ul className="sideBarList">
                    <li className="sideBarListItem active">
                        <Link to = '/'><Home/>Home </Link>
                    </li>
                </ul>
            </div>

            <div className="sideBarMenu">
                <h3>Quick Menu</h3>
                <ul className="sideBarList">

                    <li className="sideBarListItem">
                        <Link to = '/users'> <People/>Users </Link>
                    </li>
                    <li className="sideBarListItem">
                        <TimeToLeave/>Tours
                    </li>
                    <li className="sideBarListItem">
                        <TravelExplore/>Discover Gallery
                    </li>
                    <li className="sideBarListItem">
                        <PlaylistAddCheck/>Things To Do Gallery
                    </li>
                    <li className="sideBarListItem">
                        <Collections/>Tours Gallery
                    </li>
                    <li className="sideBarListItem">
                        <HelpCenter/>FAQ
                    </li>
                </ul>
            </div>

            <div className="sideBarMenu">
                <h3>Notifications </h3>
                <ul className="sideBarList">
                    
                    <li className="sideBarListItem">
                        <Mail/>Messages
                    </li>

                    <li className="sideBarListItem">
                        <Mail/>Guide Requests
                    </li>

                    <li className="sideBarListItem">
                        <Mail/>Mail Subscription
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar