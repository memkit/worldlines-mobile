import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import createSagaMiddleware from "redux-saga";

import MMKVStorage from "react-native-mmkv-storage";
const storage = new MMKVStorage.Loader().initialize();
import { reducers } from './combineReducer'
import rootSaga from './rootSaga'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, reducers)
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: false 
    }).concat(logger)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // const createDebugger = require('redux-flipper').default
      // middlewares.push(createDebugger())
    }
    // middlewares.push(...getDefaultMiddleware({ thunk: false }))
    middlewares.push(sagaMiddleware);


    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)
sagaMiddleware.run(rootSaga);

export { store, persistor }
