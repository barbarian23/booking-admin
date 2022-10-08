import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import '../assets/globals.css'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import rootSaga from '../sagas/index'
import { createWrapper } from 'next-redux-wrapper'
import { PAGE_URLS } from '../constants/urls'
import '../services/i18n/i18n.service'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AppBar from '../components/app/appBar.component';
import Drawer from '../components/app/drawer.component';
import LeftMenu from '../components/leftMenu/leftMenu.component'

//store
export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

const wrapper = createWrapper(makeStore, { debug: true })

//components
const mdTheme = createTheme();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check 
    authCheck(router.asPath);
  }, []);

  const authCheck = (url) => {
    // redirect to login page if accessing a private page and not logged in 
    // setUser(userService.userValue);
    const publicPaths = [PAGE_URLS.LOGIN, PAGE_URLS.REGISTER, PAGE_URLS.FORGET_PASSWORD];
    const path = url.split('?')[0];
    if (!publicPaths.includes(path)) {
      // setAuthorized(false);
      // router.push({
      //   pathname: PAGE_URLS.LOGIN,
      //   query: { returnUrl: router.asPath }
      // });
    } else {
      // setAuthorized(true);
    }
  }

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let { isLogedIn } = useSelector(state => state.user);

  // if (isLogedIn) {
    return <React.Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/* AppBar */}
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <LeftMenu />
              {/* <Divider sx={{ my: 1 }} /> */}
              {/* {secondaryListItems} */}
            </List>
          </Drawer>

          {/* Main */}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="1670" sx={{ mt: 1 }}>
              <Component {...pageProps} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </React.Suspense>
  // } else {
  //   return <React.Suspense fallback={<div>Loading...</div>}>
  //     <Component {...pageProps} />
  //   </React.Suspense>
  // }

}

export default wrapper.withRedux(MyApp);
