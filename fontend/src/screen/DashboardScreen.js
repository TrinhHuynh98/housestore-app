import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { Grid, Box, Typography } from '@mui/material';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  textAlign: {
    textAlign: 'center',
  },
  numberAlign: {
    marginTop: 15,
    marginBottom: 15,
    display: 'inline',
    color: 'black',
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
            <Grid item xs={6} sm={6} md={6} style={{ marginTop: 20 }}>
              <div
                style={{
                  justifyContent: 'center',
                  border: 'solid 1px black',
                  padding: 20,
                  borderRadius: 30,
                  height: 250,
                }}
              >
                <h2>Manage Page</h2>
                <ul>
                  <li>
                    {' '}
                    <Link to="/productlist">Product</Link>{' '}
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>{' '}
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ marginTop: 20 }}>
              <div
                style={{
                  justifyContent: 'center',
                  border: 'solid 1px black',
                  padding: 20,
                  borderRadius: 30,
                  height: 250,
                }}
              >
                <h2>Summarize</h2>
                <p>
                  <span>
                    <p style={{ textAlign: 'left' }}>
                      User: &nbsp;&nbsp;
                      <a className={classes.numberAlign}>
                        {summary.users[0].numUsers}
                      </a>
                    </p>
                  </span>
                </p>
                <p>
                  <span>
                    <p style={{ textAlign: 'left' }}>
                      Orders: &nbsp;&nbsp;
                      <a
                        className={classes.numberAlign}
                        // style={{ backgroundColor: '#FF133E' }}
                      >
                        {' '}
                        {summary.orders[0] ? summary.orders[0].numOrders : 0}
                      </a>
                    </p>
                  </span>
                </p>
                <p>
                  <span>
                    <p style={{ textAlign: 'left' }}>
                      Sales: &nbsp;&nbsp;
                      <a
                        className={classes.numberAlign}
                        // style={{ backgroundColor: '#00860B' }}
                      >
                        $
                        {summary.orders[0]
                          ? summary.orders[0].totalSales.toFixed(2)
                          : 0}
                      </a>
                    </p>
                  </span>
                </p>
              </div>
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
