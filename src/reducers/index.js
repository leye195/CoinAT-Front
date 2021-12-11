import { combineReducers } from "redux";
import coin from "./coin";
import bot from "./bot";
import notice from "./notice";
import trade from "./trade";

export default combineReducers({
  coin,
  bot,
  notice,
  trade,
});
