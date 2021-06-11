export type When = "一昨日" | "昨日" | "今日" | "明日" | "明後日" | WeeklyWhen;

const weeklyExpressions = ["先々週", "先週", "来週", "再来週"] as const;
export type WeeklyWhen = typeof weeklyExpressions[number];

type dayOfWeek = "月" | "火" | "水" | "木" | "金" | "土" | "日";
export type DayOfWeek = dayOfWeek | `${dayOfWeek}曜` | `${dayOfWeek}曜日`;

export const whenToDate = (when: When, dayOfWeek?: DayOfWeek): Date => {
  if (!dayOfWeek) return getAddedDate(whenMapping[when]);
  if (!weeklyExpressions.includes(when as any))
    return getAddedDate(whenMapping[when]);

  return new Date();
};

const whenMapping: { [key in When]: number } = {
  ["再来週"]: 14,
  ["来週"]: 7,
  ["明後日"]: 2,
  ["明日"]: 1,
  ["今日"]: 0,
  ["昨日"]: -1,
  ["一昨日"]: -2,
  ["先週"]: -7,
  ["先々週"]: -14,
};

const getAddedDate = (add: number): Date => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + add);
  return targetDate;
};
