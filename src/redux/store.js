import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

//You always bring in the root reducer to the store, then send the store to the provider.
import rootReducer from './root-reducer';

//logger is just one middleware, we set an array so we can always add additional middleware if needed.
const middlewares = [logger];

//createStore function takes in the rootReducer and any middleware which also takes in the middlewares array.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;