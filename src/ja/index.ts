export type When = "今日" | "明日";

export const whenToDate = (when: When): Date => {
  return getAddedDate(whenMapping[when]);
};

const whenMapping: { [key in When]: number } = {
  ["今日"]: 0,
  ["明日"]: 1,
};

const getAddedDate = (add: number): Date => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + add);
  return targetDate;
};
