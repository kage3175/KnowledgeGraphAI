import { combineReducers } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';
import chatSaga, { chatSlice } from './slices/chat';

export const rootReducer = combineReducers({
  chat: chatSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([fork(chatSaga)]);
}
