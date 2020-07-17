import socketIO from "socket.io-client";
import { v4 } from "uuid";
export let coinTickers = { tickers: [], id: -1 };
export let socket = null;
export const initSocket = () => {
    socket = socketIO.connect(process.env.REACT_APP_API);
    socket.emit("connect");
    getCoinData();
};
export const getCoinData = () => {
  socket.on("welcome", () => {
    console.log("welcome");
    socket.emit("send", () => {});
    socket.on("receive", (data) => {
      //console.log(data); //코인 데이터
      coinTickers.tickers = data.length > 0 ? data : [];
      coinTickers.id = v4();
      socket.emit("send");
    });
    socket.on("disconnected", () => {
      console.log("disconnected");
      socket.disconnect();
    });
  });
};
