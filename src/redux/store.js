import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { rootReducer } from './reducers';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
