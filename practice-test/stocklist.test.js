import { test, expect, beforeEach, describe } from "vitest";

const StockApp = require("./stocklist.js");

describe("Stock App", () => {
  test("기본 데이터 확인", () => {
    expect(StockApp.stackListArray).toBeDefined();
    expect(StockApp.stackListArray.length).toBe(8);
  });

  test("주식 추가 테스트", () => {});
});
