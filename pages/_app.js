import React from 'react'
import '../assets/globals.css'
import Header from "../components/header.component"
import Footer from "../components/footer.component"
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'
import rootSaga from '../sagas/index'
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = (context)=>{
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

const wrapper = createWrapper(makeStore, { debug: true })

function MyApp({ Component, pageProps }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </React.Suspense>
    
  )
}

export default wrapper.withRedux(MyApp);
