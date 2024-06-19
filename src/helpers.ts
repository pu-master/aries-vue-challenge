import { OptionType } from "./types";

export function calculatePL(option: OptionType, underlyingPrice: number) {
  // We use the `fair value` of the option as `premium` price.
  const premium = (Number(option.bid) + Number(option.ask)) / 2;

  const strikePrice = Number(option.strike_price);

  if (option.long_short === "long") {
    if (option.type === "Call") {
      return Math.max(0, underlyingPrice - strikePrice) - premium;
    }
    return Math.max(0, strikePrice - underlyingPrice) - premium;
  }

  if (option.type === "Call") {
    return premium - Math.max(0, underlyingPrice - strikePrice);
  }

  return premium - Math.max(0, strikePrice - underlyingPrice);
}
