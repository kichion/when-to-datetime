export type When = "一昨日" | "昨日" | "今日" | "明日" | "明後日";

export const whenToDate = (when: When): Date => {
  return getAddedDate(whenMapping[when]);
};

const whenMapping: { [key in When]: number } = {
  ["明後日"]: 2,
  ["明日"]: 1,
  ["今日"]: 0,
  ["昨日"]: -1,
  ["一昨日"]: -2,
};

const getAddedDate = (add: number): Date => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + add);
  return targetDate;
};
