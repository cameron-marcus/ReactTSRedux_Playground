import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type {} from 'redux-thunk/extend-redux'
import scrollAnimationReducer from '../features/scrollAnimation/scrollAnimationSlice';
import loginReducer from '../features/login/loginSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import quizReducer from '../features/quiz/quizSlice';

export const store = configureStore({
  reducer: {
    scrollAnimation: scrollAnimationReducer,
    login: loginReducer,
    navigation: navigationReducer,
    quiz: quizReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
