import React, { useState } from 'react'
import './chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import SendIcon from '@material-ui/icons/Send'
import axios from '../../axios.js'

function Chat({ messages }) {
    const [input, setInput] = useState("");

    const sendMessages = async (event) =>{
        event.preventDefault();


       await axios.post('/messages/new', {
            message: input,
            name: "Guest User",
            timeSpan: "Just Now",
            received:  true,
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src="https://cdn2.bulbagarden.net/upload/thumb/b/bd/Leon_Charizard.png/250px-Leon_Charizard.png" />

                <div className="chat__headerInfo">
                    <h3>Vijay Bhandari</h3>
                    <p>online</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map( (message) => (
                    <p className={`chat__message ${message.received && "chat__message__receiver"}`} >

                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timeSpan">{message.timespan}</span>
                    </p>
                ))
                }
            </div>

            <span className="chat_footer">


                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                <form onSubmit={sendMessages}>

                    <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type a message" type="text" />
                    <IconButton>
                        <SendIcon onClick={sendMessages} />
                    </IconButton>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </span>
        </div>
    )
}

export default Chat
