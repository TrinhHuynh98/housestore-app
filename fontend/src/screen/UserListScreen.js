import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import {
  deletedUser,
  listUsers,
  detailsUser,
  updatedUser,
} from '../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET_ADMIN_SIDE,
} from '../constants/userContants';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [userId, setUserId] = useState('');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: userDetailLoading,
    error: userDetailError,
    user: userDetail,
  } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success: succeesUserDelete,
  } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdateAdmibSide);
  const {
    loading: loadingUserUpdate,
    error: errorUserUpdate,
    success: succeesUserUpdate,
  } = userUpdate;

  const handleClickOpen = (user) => {
    setOpen(true);
    setUserId(user._id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (succeesUserUpdate) {
      dispatch({ type: USER_UPDATE_RESET_ADMIN_SIDE });
      dispatch(listUsers());
      setOpen(false);
    }
    if (!userDetail || userDetail._id !== userId) {
      dispatch(detailsUser(userId));
    } else {
      setName(userDetail.name);
      setEmail(userDetail.email);
      setIsAdmin(userDetail.isAdmin);
    }
  }, [dispatch, succeesUserDelete, userDetail, userId, succeesUserUpdate]);

  const deleteUserHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletedUser(user._id));
    }
  };

  const handlUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updatedUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div>
      <Helmet>User List</Helmet>
      {loadingUserDelete && <LoadingBox></LoadingBox>}
      {errorUserDelete && <Messagebox>{errorUserDelete}</Messagebox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                    <Button onClick={() => handleClickOpen(user)}>Edit</Button>
                    <Button onClick={() => deleteUserHandler(user)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Footer />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        {loadingUserUpdate && <LoadingBox></LoadingBox>}
        {errorUserUpdate && <Messagebox>{errorUserUpdate}</Messagebox>}
        {userDetailLoading && <LoadingBox></LoadingBox>}
        {userDetailError && <Messagebox>{userDetailError}</Messagebox>}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
            label="Is a Admin?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlUpdateUser}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
