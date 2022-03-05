import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { Grid, Box, Typography } from '@mui/material';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';

export default function DashboardScreen() {
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
              <Typography gutterBottom variant="h5" component="div">
                User
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {summary.users[0].numUsers}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
              <Typography gutterBottom variant="h5" component="div">
                Orders
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
              <Typography gutterBottom variant="h5" component="div">
                Sales
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                ${' '}
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
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
            <h2>Categories</h2>
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
