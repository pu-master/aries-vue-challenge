import { calculatePL, calculateBreakEvenPoint } from "@/helpers";

describe("helpers", () => {
  describe("calculatePL()", () => {
    it("should calculate profit/loss for long Call options", () => {
      const breakEvenPoint = calculatePL(
        {
          type: "Call",
          strike_price: 100,
          bid: 10,
          ask: 12,
          long_short: "long",
          expiration_date: "2025-12-17T00:00:00Z",
        },
        120
      );
      expect(breakEvenPoint).toBe(9);
    });

    it("should calculate profit/loss for short Call options", () => {
      const breakEvenPoint = calculatePL(
        {
          type: "Call",
          strike_price: 100,
          bid: 10,
          ask: 12,
          long_short: "short",
          expiration_date: "2025-12-17T00:00:00Z",
        },
        90
      );
      expect(breakEvenPoint).toBe(11);
    });

    it("should calculate profit/loss for long Put options", () => {
      const breakEvenPoint = calculatePL(
        {
          type: "Put",
          strike_price: 100,
          bid: 10,
          ask: 12,
          long_short: "long",
          expiration_date: "2025-12-17T00:00:00Z",
        },
        85
      );
      expect(breakEvenPoint).toBe(4);
    });

    it("should calculate profit/loss for short Put options", () => {
      const breakEvenPoint = calculatePL(
        {
          type: "Put",
          strike_price: 100,
          bid: 10,
          ask: 12,
          long_short: "short",
          expiration_date: "2025-12-17T00:00:00Z",
        },
        120
      );
      expect(breakEvenPoint).toBe(11);
    });
  });

  describe("calculateBreakEvenPoint()", () => {
    it("should return break even point for Call options", () => {
      const breakEvenPoint = calculateBreakEvenPoint({
        type: "Call",
        strike_price: 100,
        bid: 10,
        ask: 12,
        long_short: "long",
        expiration_date: "2025-12-17T00:00:00Z",
      });
      expect(breakEvenPoint).toBe(111);
    });

    it("should return break even point for Put options", () => {
      const breakEvenPoint = calculateBreakEvenPoint({
        type: "Put",
        strike_price: 100,
        bid: 10,
        ask: 12,
        long_short: "long",
        expiration_date: "2025-12-17T00:00:00Z",
      });
      expect(breakEvenPoint).toBe(89);
    });
  });
});
