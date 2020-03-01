import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import {repoReducer} from './src/domains/repo/Reducers';
import {connectionReducer} from './src/domains/connection/Reducers';

import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

import {
  createMigrate,
  persistStore,
  persistCombineReducers,
  REHYDRATE,
  PURGE,
} from 'redux-persist';

const persistConfig = {
  version: 1,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['repoState'],
};

const persistedReducer = persistCombineReducers(persistConfig, {
  repoState: repoReducer,
  connectState: connectionReducer,
});

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

const persistor = persistStore(store, null, () => {
  store.getState();
});

export {store, persistor};
