import { advanceTo, clear } from "jest-date-mock";
import { whenToDate, weeklyToDate, monthlyToDate } from "^/ja";

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
});

describe("whenToDate weekly", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
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

describe("whenToDate monthly", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });

  test("来月は翌月を返す", () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);
    expect(whenToDate("来月")).toEqual(targetDate);
  });

  test("先月は前月を返す", () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - 1);
    expect(whenToDate("先月")).toEqual(targetDate);
  });

  test("再来月は2ヶ月後を返す", () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 2);
    expect(whenToDate("再来月")).toEqual(targetDate);
  });

  test("先々月は2ヶ月前を返す", () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - 2);
    expect(whenToDate("先々月")).toEqual(targetDate);
  });

  test("来月 火曜は翌週火曜日の日付を返す", () => {
    expect(whenToDate("来月", "火曜")).toEqual(new Date("2019/09/03 12:00:00"));
  });

  test("再来月 金曜日は再来月金曜日の日付を返す", () => {
    expect(whenToDate("再来月", "金曜日")).toEqual(
      new Date("2019/10/04 12:00:00")
    );
  });

  test("先月 月は先月月曜日の日付を返す", () => {
    expect(whenToDate("先月", "月")).toEqual(new Date("2019/07/01 12:00:00"));
  });

  test("先々月 木曜日は再来週金曜日の日付を返す", () => {
    expect(whenToDate("先々月", "木曜日")).toEqual(
      new Date("2019/05/30 12:00:00")
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

describe("monthlyToDate dayOfWeek", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });

  test("4ヶ月前 火曜日は4月前の火曜日を返す", () => {
    expect(monthlyToDate("4ヶ月前", { dayOfWeek: "火曜日" })).toEqual(
      new Date("2019/4/2 12:00:00")
    );
  });

  test("3ヶ月後 土は3月後の土曜日を返す", () => {
    expect(monthlyToDate("3ヶ月後", { dayOfWeek: "土" })).toEqual(
      new Date("2019/11/2 12:00:00")
    );
  });
});

describe("monthlyToDate ofTheMonth", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });

  test("4ヶ月後 月初は4月後の1日を返す", () => {
    expect(monthlyToDate("4ヶ月後", { ofTheMonth: "月初" })).toEqual(
      new Date("2019/12/1 12:00:00")
    );
  });

  test("2ヶ月前 月末は2月前の末日を返す", () => {
    expect(monthlyToDate("2ヶ月前", { ofTheMonth: "月末" })).toEqual(
      new Date("2019/6/30 12:00:00")
    );
  });
});

describe("monthlyToDate", () => {
  beforeAll(() => {
    advanceTo(new Date("2019/8/1 12:00:00"));
  });
  afterAll(() => {
    clear();
  });

  test("1ヶ月後は1月後を返す", () => {
    expect(monthlyToDate("1ヶ月後")).toEqual(new Date("2019/9/1 12:00:00"));
  });

  test("1ヶ月前は1月前を返す", () => {
    expect(monthlyToDate("1ヶ月前")).toEqual(new Date("2019/7/1 12:00:00"));
  });

  test("5ヶ月後は5月先を返す", () => {
    expect(monthlyToDate("5ヶ月後")).toEqual(new Date("2020/1/1 12:00:00"));
  });

  test("8ヶ月前は8月前を返す", () => {
    expect(monthlyToDate("8ヶ月前")).toEqual(new Date("2018/12/1 12:00:00"));
  });
});
