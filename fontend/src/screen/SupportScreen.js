import socketIOClient from 'socket.io-client';
import { Grid, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Messagebox from '../components/Messagebox';
import { toast } from 'react-toastify';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function SupportScreen() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      sk.on('message', (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on('updateUser', (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on('listUsers', (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on('selectUser', (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users, userInfo]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit('onUserSelected', user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type message.');
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name },
      ];
      setMessages(allMessages);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
            {users.filter((x) => x._id !== userInfo._id).length === 0 && (
              <Messagebox>No Online User Found</Messagebox>
            )}
            <ul>
              {users
                .filter((x) => x._id !== userInfo._id)
                .map((user) => (
                  <li
                    key={user._id}
                    className={
                      user._id === selectedUser._id ? '  selected' : '  '
                    }
                  >
                    <button
                      className="block"
                      type="button"
                      onClick={() => selectUser(user)}
                    >
                      {user.name}
                    </button>
                    <span
                      className={
                        user.unread
                          ? 'unread'
                          : user.online
                          ? 'online'
                          : 'offline'
                      }
                    />
                  </li>
                ))}
            </ul>
          </Grid>
          <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
            {!selectedUser._id ? (
              <Messagebox>Select a user to start chat</Messagebox>
            ) : (
              <div>
                <div className="row">
                  <strong>Chat with {selectedUser.name} </strong>
                </div>
                <ul ref={uiMessagesRef}>
                  {messages.length === 0 && <li>No message.</li>}
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>{`${msg.name}: `}</strong> {msg.body}
                    </li>
                  ))}
                </ul>
                <div>
                  <form onSubmit={submitHandler} className="row">
                    <input
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      type="text"
                      placeholder="type message"
                    />
                    <button type="submit">Send</button>
                  </form>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
