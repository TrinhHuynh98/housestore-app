import React from 'react';
import ChairIcon from '@mui/icons-material/Chair';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import LightIcon from '@mui/icons-material/Light';
import MoreIcon from '@mui/icons-material/More';
import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';

const useStyles = makeStyles({
  tabCagtegory: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
});

export default function Category() {
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
            <div className={classes.tabCagtegory}>
              <ChairIcon />
              <h5>Chair</h5>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
            <div className={classes.tabCagtegory}>
              <TableRestaurantIcon />
              <h5>Table</h5>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
            <div className={classes.tabCagtegory}>
              <LightIcon />
              <h5>Lamp</h5>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3} style={{ marginTop: 20 }}>
            <div className={classes.tabCagtegory}>
              <MoreIcon />
              <h5>More</h5>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
