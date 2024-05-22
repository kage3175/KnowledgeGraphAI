/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as chatAPI from '../apis/chat';

interface ChatState {
  chatSummary: string | null;
  chatStatus: boolean | null | undefined; // True: 성공, False: 실패, null: 로딩중, undefined: 아직 안함.
  error: AxiosError | null;
}
export const initialState: ChatState = {
  chatSummary: null,
  chatStatus: undefined, 
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendNewMessage: (state, action: PayloadAction<chatAPI.sendNewMessagePostReqType>) => {
        state.chatStatus = null;
    },
    sendNewMessageSuccess: (state, { payload }) => {
        state.chatSummary = payload.summary;
        state.chatStatus = true;
    },
    sendNewMessageFailure: (state, { payload }) => {
        state.chatStatus = false;
    },
    createNewURL: (state, action: PayloadAction<chatAPI.createNewURLPostReqType>) => {
        state.chatStatus = null;
    },
    createNewURLSuccess: (state, { payload }) => {
        state.chatSummary = payload.summary;
        state.chatStatus = true;
    },
    createNewURLFailure: (state, { payload }) => {
        state.chatStatus = false;
    },
  },
});
export const chatActions = chatSlice.actions;

function* sendNewMessageSaga(action: PayloadAction<chatAPI.sendNewMessagePostReqType>) {
    try {
      const response: AxiosResponse = yield call(chatAPI.sendNewMessage, action.payload);
      yield put(chatActions.sendNewMessageSuccess(response));
    } catch (error) {
      yield put(chatActions.sendNewMessageFailure(error));
    }
}
function* createNewURLSaga(action: PayloadAction<chatAPI.createNewURLPostReqType>) {
    try {
      const response: AxiosResponse = yield call(chatAPI.createNewURL, action.payload);
      yield put(chatActions.createNewURLSuccess(response));
    } catch (error) {
      yield put(chatActions.createNewURLFailure(error));
    }
}

export default function* chatSaga() {
  yield takeLatest(chatActions.sendNewMessage, sendNewMessageSaga);
  yield takeLatest(chatActions.createNewURL, createNewURLSaga);
}
