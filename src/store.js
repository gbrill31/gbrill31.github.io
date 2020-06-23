import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

// import rootSaga from './sagas';

const buildStore = () => {
  // const sagaMiddleware = createSagaMiddleware();
  const isDev = process.env.NODE_ENV === "development";
  const store = createStore(
    rootReducer,
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(thunkMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(thunkMiddleware)
  );

  // sagaMiddleware.run(rootSaga);
  return store;
};

export default buildStore;
