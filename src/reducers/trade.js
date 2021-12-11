import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const GET_CHART_DATA_REQUEST = "GET_CHART_DATA_REQUEST";
export const GET_CHART_DATA_SUCCESS = "GET_CHART_DATA_SUCCESS";
export const GET_CHART_DATA_FAILURE = "GET_CHART_DATA_FAILURE";
export const UPDATE_TICKET = "UPDATE_TICKET";

export const IS_FIRST_LOAD = "IS_FIRST_LOAD";

export const getChartData = createAction(GET_CHART_DATA_REQUEST);
export const setIsFirstLoad = createAction(IS_FIRST_LOAD);

const initialState = {
  chartData: [],
  type: "upbit",
  loading: true,
  isFirstLoad: true,
};
export default handleActions(
  {
    [GET_CHART_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
      }),
    [GET_CHART_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const data = action.payload;
        draft.isLoading = false;
        draft.chartData = [...data.reverse()];
      }),
    [GET_CHART_DATA_FAILURE]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = false;
      }),
    [IS_FIRST_LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.isFirstLoad = action.payload.isFirstLoad;
      }),
  },
  initialState,
);
