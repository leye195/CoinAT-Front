import { all, call } from "redux-saga/effects";
import coin from "./coin";
import bot from "./bot";

export default function* rootSaga() {
  yield all([call(coin), call(bot)]);
}
