import { OptionType } from "./types";

/**
 * Calculate profit/loss for provided option
 * and underlying price.
 */
export function calculatePL(option: OptionType, underlyingPrice: number) {
  // We use the `fair value` of the option as `premium` price.
  const premium =
    Math.ceil(((Number(option.bid) + Number(option.ask)) / 2) * 100) / 100;

  const strikePrice = Number(option.strike_price);

  let pl;
  if (option.long_short === "long") {
    if (option.type === "Call") {
      pl = Math.max(0, underlyingPrice - strikePrice) - premium;
    } else {
      pl = Math.max(0, strikePrice - underlyingPrice) - premium;
    }
  } else {
    if (option.type === "Call") {
      pl = premium - Math.max(0, underlyingPrice - strikePrice);
    } else {
      pl = premium - Math.max(0, strikePrice - underlyingPrice);
    }
  }

  // Round to 2 decimal points.
  return Math.ceil(pl * 100) / 100;
}

/**
 * Calculate the break even point for a given option.
 */
export function calculateBreakEvenPoint(option: OptionType) {
  // We use the `fair value` of the option as `premium` price.
  const premium = (Number(option.bid) + Number(option.ask)) / 2;

  const strikePrice = Number(option.strike_price);

  if (option.type === "Call") {
    return premium + strikePrice;
  }
  return strikePrice - premium;
}
