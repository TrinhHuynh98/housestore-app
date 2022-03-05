import { InputAdornment, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function SearchBox(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${name}`);
  };

  return (
    <Box component="form">
      <form onSubmit={handleSubmit}>
        <TextField
          id="input-with-icon-textfield"
          style={{ color: 'white', marginTop: 10, marginRight: 10 }}
          defaultValue="search"
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            style: { color: 'white' },
            startAdornment: (
              <InputAdornment position="start" style={{ color: 'white' }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </form>
    </Box>
  );
}
