import axios from 'axios';

const baseURL = `https://api.upbit.com/v1/candles`;
const api = axios.create({
  baseURL
});
//upbit coin candles

export const getCandles = ({market, candleType, count = 200,  minute = 3 }) => {
  if(candleType==="minutes") return api.get(`/minutes/${minute}?market=${market}&count=${count}`);
  
  if(candleType==="days") return api.get(`/days?market=${market}&count=${count}`);
 
  if(candleType==="weeks") return api.get(`/weeks?market=${market}&count=${count}`);

  return api.get(`/months?market=${market}&count=${count}`);
}
