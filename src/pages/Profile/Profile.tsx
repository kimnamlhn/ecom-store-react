import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import AppTheme from '../../components/AppTheme';
import ProfileCard from '../../components/ProfileCard';
export default function Product(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <div mt-5>
        <ProfileCard />
        
        <Footer />
      </div>
    </AppTheme>
  );
}
