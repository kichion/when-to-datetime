export type When =
  | "一昨日"
  | "昨日"
  | "今日"
  | "明日"
  | "明後日"
  | WeeklyWhen
  | MonthlyWhen;

const weeklyExpressions = ["先々週", "先週", "来週", "再来週"] as const;
export type WeeklyWhen = typeof weeklyExpressions[number];

const monthlyExpressions = ["先々月", "先月", "来月", "再来月"] as const;
export type MonthlyWhen = typeof monthlyExpressions[number];

type dayOfWeek = "月" | "火" | "水" | "木" | "金" | "土" | "日";
export type DayOfWeek = dayOfWeek | `${dayOfWeek}曜` | `${dayOfWeek}曜日`;

export type Weekly = `${number}週間後` | `${number}週間前`;

export type Monthly = `${number}ヶ月後` | `${number}ヶ月前`;

type ofTheMonth = "月初" | "月末";

type monthlyOption = {
  dayOfWeek?: DayOfWeek;
  ofTheMonth?: ofTheMonth;
};

export const toDate = (w: When | Weekly | Monthly): Date => {
  if (w.includes("週間")) return weeklyToDate(w as Weekly);
  if (w.includes("ヶ月")) return monthlyToDate(w as Monthly);
  return whenToDate(w as When);
};

export const monthlyToDate = (
  monthly: Monthly,
  option?: monthlyOption
): Date => {
  const month = monthly.split("ヶ月");
  const offset = month[1] === "後" ? 1 : -1;
  const targetMonth = getAddedMonth(+month[0] * offset);
  if (option?.dayOfWeek) {
    return offsetDayOfWeek(targetMonth, option.dayOfWeek);
  } else if (option?.ofTheMonth)
    return offsetOfTheMonth(targetMonth, option.ofTheMonth);
  return targetMonth;
};

export const weeklyToDate = (weekly: Weekly, dayOfWeek?: DayOfWeek): Date => {
  const week = weekly.split("週間");
  const offset = week[1] === "後" ? 7 : -7;
  const targetWeek = getAddedDate(+week[0] * offset);
  return dayOfWeek ? offsetDayOfWeek(targetWeek, dayOfWeek) : targetWeek;
};

export const whenToDate = (when: When, dayOfWeek?: DayOfWeek): Date => {
  if (weeklyExpressions.includes(when as any))
    return weeklyDate(when as WeeklyWhen, dayOfWeek);
  if (monthlyExpressions.includes(when as any))
    return monthlyDate(when as MonthlyWhen, dayOfWeek);

  return getAddedDate(whenMapping[when]);
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
  // NOTE: 下記は月の追加を表現している
  ["先々月"]: -2,
  ["先月"]: -1,
  ["来月"]: 1,
  ["再来月"]: 2,
};

const dayOfWeekMapping: { [key in dayOfWeek]: number } = {
  ["日"]: 0,
  ["月"]: 1,
  ["火"]: 2,
  ["水"]: 3,
  ["木"]: 4,
  ["金"]: 5,
  ["土"]: 6,
};

const getAddedDate = (add: number): Date => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + add);
  return targetDate;
};

const getAddedMonth = (add: number): Date => {
  const targetDate = new Date();
  var day = targetDate.getDate();

  var nextDate = targetDate;
  nextDate.setMonth(nextDate.getMonth() + add);
  var lastDay = new Date(
    nextDate.getFullYear(),
    nextDate.getMonth() + 2,
    0
  ).getDate();

  if (lastDay < day) {
    nextDate.setDate(lastDay);
  } else {
    nextDate.setDate(day);
  }
  return nextDate;
};

const weeklyDate = (when: WeeklyWhen, dayOfWeek?: DayOfWeek): Date => {
  const targetWeek = getAddedDate(whenMapping[when]);
  return dayOfWeek ? offsetDayOfWeek(targetWeek, dayOfWeek) : targetWeek;
};

const monthlyDate = (when: MonthlyWhen, dayOfWeek?: DayOfWeek): Date => {
  const targetMonth = getAddedMonth(whenMapping[when]);
  return dayOfWeek ? offsetDayOfWeek(targetMonth, dayOfWeek) : targetMonth;
};

const offsetDayOfWeek = (date: Date, dayOfWeek: DayOfWeek) => {
  const day: dayOfWeek = (dayOfWeek as string).charAt(0) as dayOfWeek;
  date.setDate(date.getDate() + dayOfWeekMapping[day] - date.getDay());
  return date;
};

const offsetOfTheMonth = (targetMonth: Date, ofTheMonth: ofTheMonth): Date => {
  switch (ofTheMonth) {
    case "月初":
      targetMonth.setDate(1);
      break;
    case "月末":
      targetMonth.setMonth(targetMonth.getMonth() + 1);
      targetMonth.setDate(0);
      break;
  }
  return targetMonth;
};
