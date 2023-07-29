import { useState, useEffect } from "react";
import io from 'socket.io-client';

// const socket = io("/");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }

    setMessages([...messages, newMessage]);
    // envia el mensaje a backend
    // socket.emit('chat', message);
  } 

  // useEffect(() => {
  //   socket.on('message', receiveMesage);

  //   return () => {
  //     socket.off('chat', receiveMesage);
  //   }
  // }, [])

  // const receiveMesage = (message) => setMessages((state) => [...state, message]);

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '4rem'}}>
        <input  
          type="text"
          placeholder="Escribe tu mensaje aqui..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>

      <ul>
        {
          messages.map((message, index) => (
            <li key={index}>
              {message.from}:{message.body}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Chat;