import { advanceTo, clear } from "jest-date-mock";
import { whenToDate, weeklyToDate } from "#/ja";

describe("whenToDate", () => {
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

  test("来週 火曜は翌週火曜日の日付を返す", () => {
    expect(whenToDate("来週", "火曜")).toEqual(new Date("2019/8/6 12:00:00"));
  });

  test("再来週 金曜日は再来週金曜日の日付を返す", () => {
    expect(whenToDate("再来週", "金曜日")).toEqual(
      new Date("2019/8/16 12:00:00")
    );
  });

  test("先週 月は先週月曜日の日付を返す", () => {
    expect(whenToDate("先週", "月")).toEqual(new Date("2019/7/22 12:00:00"));
  });

  test("先々週 木曜日は再来週金曜日の日付を返す", () => {
    expect(whenToDate("先々週", "木曜日")).toEqual(
      new Date("2019/7/18 12:00:00")
    );
  });
});

describe("weeklyToDate", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });

  test("1週間後は7日後を返す", () => {
    expect(weeklyToDate("1週間後")).toEqual(new Date("2019/8/8 12:00:00"));
  });

  test("1週間前は7日前を返す", () => {
    expect(weeklyToDate("1週間前")).toEqual(new Date("2019/7/25 12:00:00"));
  });

  test("5週間後は35日後を返す", () => {
    expect(weeklyToDate("5週間後")).toEqual(new Date("2019/9/5 12:00:00"));
  });

  test("8週間前は56日前を返す", () => {
    expect(weeklyToDate("8週間前")).toEqual(new Date("2019/6/6 12:00:00"));
  });

  test("4週間前 火曜日は4週前の火曜日を返す", () => {
    expect(weeklyToDate("4週間前", "火曜日")).toEqual(
      new Date("2019/7/2 12:00:00")
    );
  });

  test("3週間後 土は3週後の土曜日を返す", () => {
    expect(weeklyToDate("3週間後", "土")).toEqual(
      new Date("2019/8/24 12:00:00")
    );
  });
});
