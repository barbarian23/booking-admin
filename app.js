import React from 'react'
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
      <Component {...pageProps} />
    </React.Suspense>
    
  )
}

export default wrapper.withRedux(MyApp);
