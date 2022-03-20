import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import globalReducer from './globalReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    global: globalReducer,
  },
});
