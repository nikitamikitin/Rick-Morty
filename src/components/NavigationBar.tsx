import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Urls from 'constants/Urls';
import pages from 'constants/Pages';

const styles={
  drawer:{
    width: { xs: '100%', sm: '50%' },
    height: { xs: '100%', sm: '50%' },
    '& .MuiPaper-root': { height: { xs: '100%', sm: '50%' } },
  },
  rootContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: '100%',
  },
  childRootContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typ:{
    fontFamily: 'monospace',
    fontWeight: 500,
    letterSpacing: '.2rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  container:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button:{ color: 'white', display: { xs: 'none', md: 'block' } },
  buttonB:{
    my: 2,
    color: 'white',
    display: { xs: 'none', md: 'block' },
  },
  typM:{
    mr: 2,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  iconContainer:{ flexGrow: 1, display: { xs: 'flex', md: 'none' } },
  typh5:{
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'white',
    textDecoration: 'none',
  },
  containerPagesB:{
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'end',
  },
}


const NavigationBar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const history = useNavigate();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery('(max-width: 900px)');
  const handleOpenNavMenu = () => {
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const navigateAndCloseNaveBar = (page: string) => {
    history(page);
    setOpenDrawer(false);
  };

  useEffect(() => {
    setOpenDrawer(false);
  }, [isDesktop]);


  return (
    <AppBar position="static">
      <Drawer
        sx={styles.drawer}
        anchor="top"
        open={openDrawer}
        onClose={() => closeDrawer()}
      >
        <Box
          sx={styles.rootContainer}
        >
          <Box
            sx={styles.childRootContainer}
          >
            <Typography
              variant="h6"
              noWrap
              sx={styles.typ}
            >
              Rick&Morty
            </Typography>
          </Box>
          <Box
            sx={styles.container}
          >
            {pages.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigateAndCloseNaveBar(item.value)}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box
            sx={styles.container}
          >
            <IconButton autoFocus onClick={() => closeDrawer()}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            sx={styles.button}
            onClick={() => navigate(Urls.characters)}
          >
            <Typography
              variant="h6"
              noWrap
              sx={styles.typM}
            >
              Rick&Morty
            </Typography>
          </Button>

          <Box sx={styles.iconContainer}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Button onClick={() => navigateAndCloseNaveBar(Urls.characters)}>
            <Typography
              variant="h5"
              noWrap
              sx={styles.typh5}
            >
              Rick&Morty
            </Typography>
          </Button>
          <Box
            sx={styles.containerPagesB}
          >
            {pages.map((item, index) => (
              <Button
                key={index}
                onClick={() => navigateAndCloseNaveBar(item.value)}
                sx={styles.buttonB}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
