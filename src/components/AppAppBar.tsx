import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Sitemark from './SitemarkIcon';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme).palette.divider,
  // backgroundColor: theme.vars
  //   ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
  //   : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Link to="/">
              <Sitemark />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="/products">
                <Button variant="text" color="info" size="small">
                  Products
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Link to="/login">
              <Button color="primary" variant="text" size="small">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button color="primary" variant="contained" size="small">
                Sign up
              </Button>
            </Link>
            <ColorModeIconDropdown />
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
