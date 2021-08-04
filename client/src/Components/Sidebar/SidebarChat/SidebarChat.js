import React from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'

function SidebarChats() {
    return (
        <div className = "sidebarChat">
            <Avatar src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png" />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChats
