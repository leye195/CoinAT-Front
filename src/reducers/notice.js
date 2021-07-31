import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const GET_NOTICE_REQUEST = "NOTICE_REQUEST";
export const GET_NOTICE_FAILURE = "GET_NOTICE_FAILURE";
export const GET_NOTICE_SUCCESS = "GET_NOTICE_SUCCESS";

export const loadNotice = createAction(GET_NOTICE_REQUEST);

const initialState = {
  notices: [],
  more: false,
  isLoading: false,
};
export default handleActions(
  {
    [GET_NOTICE_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = true;
      }),
    [GET_NOTICE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const { notices, more, page, type } = action.payload;

        draft.notices =
          type === "notice"
            ? page > 1
              ? [...draft.notices, ...notices]
              : notices
            : notices;
        draft.more = more;
        draft.isLoading = false;
      }),
    [GET_NOTICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = false;
      }),
  },
  initialState,
);
