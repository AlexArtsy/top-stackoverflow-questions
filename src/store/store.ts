import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './question-slice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    questions: questionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispath>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
