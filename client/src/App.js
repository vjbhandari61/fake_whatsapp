import React, { useEffect, useState } from 'react'
import './App.css'
import Chat from './Components/Chats/chat.js'
import Sidebar from './Components/Sidebar/Sidebar.js'
import Pusher from 'pusher-js'
import axios from './axios.js'

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/show')
      .then(response => {
        setMessages(response.data);
      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('45e7faadfee8e6fce5a2', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };


  }, [messages])

  return (
    <div className="app_container">
      <div className="app_body">
        <Sidebar />
        <Chat messages ={messages} />
      </div>
    </div>
  )
}

export default App
