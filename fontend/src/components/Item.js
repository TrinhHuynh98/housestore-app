import React from 'react';
import { Paper, Button, Grid, Box, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

function Item(props) {
  return (
    <Paper>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={7} sm={7} md={7} style={{ marginTop: 20 }}>
            <Card>
              <CardMedia
                component="img"
                image={props.item.image}
                style={{ height: 300, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={5} sm={5} md={5} style={{ marginTop: 20 }}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button
              className="CheckButton"
              variant="contained"
              style={{
                backgroundColor: '#D15B5B',
                color: 'white',
                border: 'solid 1px',
                marginTop: 15,
                marginBottom: 15,
                borderRadius: 30,
                padding: 10,
              }}
            >
              <Link
                to="/product"
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                Check it out!
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
export default Item;
