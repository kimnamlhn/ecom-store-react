import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../components/AppTheme';
import ProductCard from '../../components/ProductCard';

export default function Product(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <div>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        
        <Footer />
      </div>
    </AppTheme>
  );
}
