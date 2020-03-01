import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import {repoReducer} from './domains/search/Reducers.js';

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
  // stateReconciler: hardSet
};

const persistedReducer = persistCombineReducers(persistConfig, {
  repoState: repoReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
const persistor = persistStore(store, null, () => {
  store.getState();
});

export {store, persistor};
