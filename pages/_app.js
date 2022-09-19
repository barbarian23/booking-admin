import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import '../assets/globals.css'
// import Header from "../components/header.component"
// import Footer from "../components/footer.component"
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import rootSaga from '../sagas/index'
import { createWrapper } from 'next-redux-wrapper';
import { PAGE_URLS } from '../constants/urls';

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

const wrapper = createWrapper(makeStore, { debug: true })

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
      router.push({
        pathname: PAGE_URLS.LOGIN,
        query: { returnUrl: router.asPath }
      });
    } else {
      // setAuthorized(true);
    }
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {/* <Header/> */}
      <Component {...pageProps} />
      {/* <Footer/> */}
    </React.Suspense>

  )
}

export default wrapper.withRedux(MyApp);
