import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {  
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST, 
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { REDUX_CONFIG } from '@/utils/enums';
import {dashboardSettingsReducer} from './slices'

const version = REDUX_CONFIG.latestMigrationVersion

const persistConfig = {
  key: 'root',
  version,             
  storage,
  // migrate: persistMigrate,
  blacklist: ['dashboardSettings'], // Don't persist the slices in this array
};

const rootReducer = combineReducers({
  dashboardSettings: dashboardSettingsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
