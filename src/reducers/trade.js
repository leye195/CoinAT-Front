
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const GET_CHART_DATA_REQUEST = "GET_CHART_DATA_REQUEST";
export const GET_CHART_DATA_SUCCESS = "GET_CHART_DATA_SUCCESS";
export const GET_CHART_DATA_FAILURE = "GET_CHART_DATA_FAILURE";
export const UPDATE_TICKET = "UPDATE_TICKET";



export const getChartData = createAction(GET_CHART_DATA_REQUEST);

const initialState = {
  chartData: [],
  type: 'upbit',
  loading: true,
};
export default handleActions(
  {
    [GET_CHART_DATA_REQUEST]: (state, action) => produce(state, (draft) => {
        draft.isLoading = true;
    }),
    [GET_CHART_DATA_SUCCESS]: (state,action) => produce(state,(draft) => {
        const data = action.payload;
        draft.isLoading = false;
        draft.chartData = [...data.reverse()];
    }),
    [GET_CHART_DATA_FAILURE]: (state,action) => produce(state,(draft) => {
        draft.isLoading = false;
    }),
  },
  initialState
);
