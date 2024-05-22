import client from './client';

export type sendNewMessagePostReqType = {
    url: string,
    message: string
};

export const sendNewMessage = async (payload: sendNewMessagePostReqType) => {
  const response = await client.post<sendNewMessagePostReqType>(`/api/chat/`, payload);
  return response.data;
};

export type createNewURLPostReqType = {
    url: string,
};

export const createNewURL = async (payload: createNewURLPostReqType) => {
  const response = await client.post<createNewURLPostReqType>(`/api/chat/`, payload);
  return response.data;
};
