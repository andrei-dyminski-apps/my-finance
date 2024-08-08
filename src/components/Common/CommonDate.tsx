import { getFullDate } from "@/helpers/date";

export const CommonDate = ({ date }: { date: string }) => (
  <time dateTime={date} data-cy="item-date" className="flex items-center justify-center rounded-[8px] border border-black p-2 leading-none dark:border-white">
    {getFullDate(date, "DD MMMM YYYY")}
  </time>
);
