import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Avatar, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChats from '../Sidebar/SidebarChat/SidebarChat.js'



function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src= 'https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png' />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start New Chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChats />
                <SidebarChats />
                <SidebarChats />
                <SidebarChats />
                <SidebarChats />
            </div>
        </div>
    )
}

export default Sidebar
