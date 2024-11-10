import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../components/AppTheme';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import './Product.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductDetail } from '../../models/ProductDetail';

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <div className='product-container'>
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
                <Button size="small">{product.sale_price}$</Button>
                <Button size="small"> sold: {product.sold}</Button>
              </CardActions>
            </Card>
            
          ))}

        </Box>
      </div>

      <Footer />

    </AppTheme>
  );
}
