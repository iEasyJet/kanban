import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import boardReducer from './Slices/boardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});
