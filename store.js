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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistCombineReducers(persistConfig, {
  repoState: repoReducer, // per salvare l'input dell'utente
  connectState: connectionReducer, // per gestire la connessione
});

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store, null, () => {
  store.getState();
});

export {store, persistor};
