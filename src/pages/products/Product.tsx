import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../components/AppTheme';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import './Product.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductDetail } from '../../models/ProductDetail';
import { Link } from 'react-router-dom';

export default function Product(props: { disableCustomTheme?: boolean }) {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const getProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await axios.get('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/products', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data.status === 200) {
        const products = response.data.data.products;

        setProducts(products);
      }
      else {
        setErrorMessage('Some thing went wrong, please try again');
      }
    } catch (error) {
      setErrorMessage('Some thing went wrong, please try again');
    }
  };

  const HandleOrder = async (productId: string, quantity: number) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await axios.post('https://ccmernapp-11a99251a1a7.herokuapp.com/api/shop/order/create',
        { 
          productId,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.status === 200) {
        alert("Your product have successfully ordered !")
      }
      else {
        setErrorMessage('Some thing went wrong, please try again');
      }
    } catch (error) {
      setErrorMessage('Some thing went wrong, please try again');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <div className='product-container'>
        <div className='order-page-url'>
          View your order:
          <Link to="/orders">
            <Button color="primary" variant="text" size="small" className='order-page-btn'>
              View
            </Button>
          </Link>
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

          {products.map((product) => (
            <Card sx={{ width: 320 }}>
              <CardMedia
                component="img"
                alt="product"
                height="140"
                image={`/images/${product.img}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" className='product-price-btn'>{product.sale_price}$</Button>
                <Button size="small" className='order-product-btn' onClick={() => HandleOrder(product.id, 1)}> Order</Button>
              </CardActions>
            </Card>
            
          ))}

        </Box>
      </div>

      <Footer />

    </AppTheme>
  );
}
