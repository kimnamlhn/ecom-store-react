import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../components/AppTheme';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderDetail } from '../../models/OrderDetail';
import './Order.css'

export default function Order(props: { disableCustomTheme?: boolean }) {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/orders', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data.status === 200) {
        const orders = response.data.data.orders;

        setOrders(orders);
      }
      else {
        setErrorMessage('Some thing went wrong, please try again');
      }
    } catch (error) {
      setErrorMessage('Some thing went wrong, please try again');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <div className='order-container'>
        <div className='order-text'>
          Below is your order:
        </div>

        <Box
          sx={{
            my: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            p: 2,
            flexWrap: 'wrap',
          }}>

          {orders.map((order) => (
            <Card sx={{ width: 320 }}>
              <CardMedia
                component="img"
                alt="product"
                height="140"
                image={`/images/order.png`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {order.orderNumber}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  SKU: {order.sku}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"> Status: {order.status}$</Button>
              </CardActions>
            </Card>
            
          ))}

        </Box>
      </div>

      <Footer />

    </AppTheme>
  );
}
