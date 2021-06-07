import { whenToDate } from "#/ja";

describe("test", () => {
  let now: Date;
  let spiedDate: jest.SpyInstance<string, []>;
  beforeAll(() => {
    const OriginalDate = Date; // 退避
    now = new OriginalDate("2019/8/1 12:00:00");
    // Date.now() と new Date() のみmocking
    Date.now = jest.fn().mockReturnValue(now.valueOf());
    spiedDate = jest
      .spyOn(global, "Date")
      .mockImplementation(() => now as unknown as string);
  });
  afterAll(() => {
    spiedDate.mockRestore();
  });
  test("today", () => {
    expect(whenToDate("今日")).toBe(new Date());
  });
});
