import React from 'react'
import './TopBar.css'
import {PersonAdd,Message, Settings} from '@mui/icons-material';

const TopBar = () => {
  return (
    <div className = 'topBar'>
        <div className="topBarWrapper">
            <div className="topLeft">
                <span className="logo">CeylonAssistant Admin</span>
            </div>

            <div className="topRight">
                <div className="topBarIconContainer">
                    <PersonAdd />
                    <span className="topIconBadge">99+</span>
                </div>

                <div className="topBarIconContainer">
                    <Message />
                    <span className="topIconBadge">99+</span>
                </div>
                
                <img src="https://thumbs.dreamstime.com/b/attractive-young-woman-taking-selfie-attractive-young-woman-taking-selfie-color-background-125943076.jpg" 
                alt="" className="topAvatar" />
            </div>
        </div>    
    </div>
  )
}

export default TopBar