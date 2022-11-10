import React from 'react'
import './SideBar.css'
import {HelpCenter, People, PlaylistAddCheck, TimeToLeave,TravelExplore,Collections, Mail, Home, BookOnline} from '@mui/icons-material';
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
                        <Link to = '/adminPage'> <People/> Users </Link>
                    </li>
                    <li className="sideBarListItem">
                    <Link to = '/bookings'> <BookOnline/> Bookings </Link>
                    </li>
                    <li className="sideBarListItem">
                    <Link to = '/discover'><TravelExplore/> Discover Gallery </Link>
                    </li>
                    <li className="sideBarListItem">
                    <Link to = '/addThingsToDo'><PlaylistAddCheck/> Things To Do Gallery</Link>
                    </li>
                    <li className="sideBarListItem">
                    <Link to = '/toursGallery'><Collections/> Tours Gallery </Link>
                    </li>
                    <li className="sideBarListItem">
                    <Link to = '/faq'><HelpCenter/> FAQ</Link>
                    </li>
                </ul>
            </div>

            <div className="sideBarMenu">
                <h3>Notifications </h3>
                <ul className="sideBarList">
                    
                    <li className="sideBarListItem">
                        <Mail/> Messages
                    </li>

                    <li className="sideBarListItem">
                        <Mail/> Guide Requests
                    </li>

                    <li className="sideBarListItem">
                        <Mail/> Mail Subscription
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar