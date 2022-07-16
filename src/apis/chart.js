import { upbitApi as api } from "apis";

export const getCandles = ({
  market,
  candleType = "months",
  count = 200,
  minute = 3,
}) => {
  if (candleType === "minutes")
    return api.get(
      `/candles/minutes/${minute}?market=${market}&count=${count}`,
    );

  return api.get(`/candles/${candleType}?market=${market}&count=${count}`);
};
