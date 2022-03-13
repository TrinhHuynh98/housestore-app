import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { Grid, Box, Typography } from '@mui/material';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  textAlign: {
    textAlign: 'center',
  },
  numberAlign: {
    borderRadius: 5,
    display: 'inline',
    color: 'white',
    padding: 10,
  },
});

export default function DashboardScreen() {
  const classes = useStyles();
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, error, summary } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <Messagebox>{error}</Messagebox>
      ) : (
        <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
              <h2 className={classes.textAlign}>User</h2>
              <p style={{ textAlign: 'center' }}>
                <a
                  className={classes.numberAlign}
                  style={{ backgroundColor: '#D15B5B' }}
                >
                  {summary.users[0].numUsers}
                </a>
              </p>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
              <h2 className={classes.textAlign}>Orders</h2>
              <p style={{ textAlign: 'center' }}>
                <a
                  className={classes.numberAlign}
                  style={{ backgroundColor: '#FF133E' }}
                >
                  {' '}
                  {summary.orders[0] ? summary.orders[0].numOrders : 0}
                </a>
              </p>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
              <h2 className={classes.textAlign}>Sales</h2>
              <p style={{ textAlign: 'center' }}>
                <a
                  className={classes.numberAlign}
                  style={{ backgroundColor: '#00860B' }}
                >
                  $
                  {summary.orders[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                </a>
              </p>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ marginTop: 20 }}
          >
            <h2 style={{ textAlign: 'center' }}>Chart Sale</h2>
            {summary.dailyOrders.length === 0 ? (
              <Messagebox>No Sale</Messagebox>
            ) : (
              <>
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              </>
            )}
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <h2 style={{ textAlign: 'center' }}>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <Messagebox>No Category</Messagebox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
}
