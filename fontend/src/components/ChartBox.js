import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import socketIOClient from 'socket.io-client';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    color: 'black',
  },
});

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function ChartBox(props) {
  const classes = useStyles();
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
        display: 'none',
      });
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on('message', (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [socket, messages, isOpen, userInfo]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className="chatbox">
        {!isOpen ? (
          <Button type="button" onClick={supportHandler}>
            <MarkUnreadChatAltOutlinedIcon />
          </Button>
        ) : (
          <>
            <div
              style={{
                backgroundColor: 'white',
                border: 'solid 1px black',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ alignItems: 'flex-start' }}> Support </strong>
                <CloseOutlinedIcon
                  fontSize="small"
                  color="black"
                  onClick={closeHandler}
                />
              </div>
              <ul ref={uiMessagesRef}>
                {messages.map((msg, index) => (
                  <li>
                    <strong key={index}>{`${msg.name}: `}</strong> {msg.body}
                  </li>
                ))}
              </ul>
              <div>
                <form onSubmit={submitHandler} className="row">
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <TextField
                      id="standard-basic"
                      label="Message"
                      type="text"
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      fullWidth
                      inputProps={{
                        className: classes.input,
                      }}
                    />
                    <button type="submit" style={{ border: 'none' }}>
                      <SendOutlinedIcon fontSize="small" color="black" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
