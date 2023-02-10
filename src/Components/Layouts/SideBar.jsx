import React from "react";
import "./SideBar.css";
import {
  HelpCenter,
  People,
  PlaylistAddCheck,
  TimeToLeave,
  TravelExplore,
  Collections,
  Mail,
  Home,
  BookOnline,
  Message, 
  PersonAdd
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3>Dashboard</h3>
          <ul className="sideBarList">
           
              <NavLink to="/" className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                } end>
                <Home />
                Home{" "}
              </NavLink>
            
          </ul>
        </div>

        <div className="sideBarMenu">
          <h3>Quick Menu</h3>
          <ul className="sideBarList">
            
              <NavLink
                to="/adminPage"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                {" "}
                <People /> Users{" "}
              </NavLink>       
            
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                {" "}
                <BookOnline /> Bookings{" "}
              </NavLink>
            
            
              <NavLink
                to="/discover"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <TravelExplore /> Discover Gallery{" "}
              </NavLink>
           
         
              <NavLink
                to="/addThingsToDo"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <PlaylistAddCheck /> Things To Do Gallery
              </NavLink>
         
          
              <NavLink
                to="/toursGallery"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <Collections /> Tours Gallery{" "}
              </NavLink>
        
           
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <HelpCenter /> FAQ
              </NavLink>
           
          </ul>
        </div>

        <div className="sideBarMenu">
          <h3>Notifications </h3>
          <ul className="sideBarList">
            <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <Message /> Messages
              </NavLink>

              <NavLink
                to="/guideRequests"
                className={({ isActive }) =>
                  isActive ? "sideBarListItem active" : "sideBarListItem"
                }
              >
                <PersonAdd /> Guide Requests
              </NavLink>

            <li className="sideBarListItem">
              <Mail /> Mail Subscription
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;