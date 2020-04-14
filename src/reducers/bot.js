import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const sendMessage = createAction(SEND_MESSAGE_REQUEST);

const initialState = {
  isSending: false,
};

export default handleActions(
  {
    [SEND_MESSAGE_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isSending = true;
      }),
    [SEND_MESSAGE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.isSending = false;
      }),
    [SEND_MESSAGE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isSending = false;
      }),
  },
  initialState
);
