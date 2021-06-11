import { advanceBy, advanceTo, clear } from "jest-date-mock";
import { whenToDate } from "#/ja";

describe("test", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });
  test("今日は本日を返す", () => {
    expect(whenToDate("今日")).toEqual(new Date());
  });

  test("明日は翌日を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    expect(whenToDate("明日")).toEqual(targetDate);
  });

  test("昨日は前日を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 1);
    expect(whenToDate("昨日")).toEqual(targetDate);
  });

  test("明後日は2日後を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    expect(whenToDate("明後日")).toEqual(targetDate);
  });

  test("一昨日は2日前を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 2);
    expect(whenToDate("一昨日")).toEqual(targetDate);
  });

  test("来週は7日後を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    expect(whenToDate("来週")).toEqual(targetDate);
  });

  test("先週は7日前を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 7);
    expect(whenToDate("先週")).toEqual(targetDate);
  });

  test("再来週は14日後を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    expect(whenToDate("再来週")).toEqual(targetDate);
  });

  test("先々週は14日前を返す", () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 14);
    expect(whenToDate("先々週")).toEqual(targetDate);
  });
});
