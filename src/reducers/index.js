import { combineReducers } from "redux";
import coin from "./coin";
import bot from "./bot";
import notice from "./notice";
export default combineReducers({
  coin,
  bot,
  notice,
});
