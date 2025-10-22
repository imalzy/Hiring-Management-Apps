import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en";

dayjs.extend(localeData);

function MonthView({
  date,
  onSelect,
}: {
  date: dayjs.Dayjs;
  onSelect: (m: number) => void;
}) {
  const months = dayjs.monthsShort();
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      {months.map((m, i) => (
        <div
          key={m}
          onClick={() => onSelect(i)}
          className="p-2 hover:bg-[var(--primary-color)]/10 text-[var(--foreground)] rounded-lg cursor-pointer transition"
        >
          {m}
        </div>
      ))}
    </div>
  );
}

export default MonthView;
