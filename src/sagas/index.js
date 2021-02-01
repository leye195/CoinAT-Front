import { all, call } from "redux-saga/effects";
import coin from "./coin";
import bot from "./bot";
import notice from "./notice";

export default function* rootSaga() {
  yield all([call(coin), call(bot), call(notice)]);
}
