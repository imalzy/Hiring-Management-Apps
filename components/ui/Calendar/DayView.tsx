import dayjs, { Dayjs } from "dayjs";

interface DayViewProps {
  date: Dayjs;
  onSelect: (date: Dayjs) => void;
}

export default function DayView({ date, onSelect }: DayViewProps) {
  const start = date.startOf("month").startOf("week");
  const end = date.endOf("month").endOf("week");

  const days: Dayjs[] = [];
  let day = start;

  while (day.isBefore(end, "day") || day.isSame(end, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const isToday = (d: Dayjs) => d.isSame(dayjs(), "day");
  const isSelected = (d: Dayjs) => d.isSame(date, "day");

  return (
    <div className="grid grid-cols-7 text-center text-sm gap-1">
      {["S", "M", "T", "W", "T", "F", "S"].map((label, i) => (
        <div
          key={`weekday-${i}`}
          className="font-bold text-[var(--natural-100)]"
        >
          {label}
        </div>
      ))}

      {days.map((d) => {
        const key = d.format("YYYY-MM-DD");
        const inCurrentMonth = d.month() === date.month();

        return (
          <div
            key={key}
            onClick={() => onSelect(d)}
            className={`p-2 rounded-lg flex items-center justify-center cursor-pointer transition
              ${inCurrentMonth ? "text-[var(--natural-90)]" : "text-[var(--natural-60)]"}
              ${isSelected(d) ? "bg-[#01959F] text-white" : ""}
              ${
                !isSelected(d) && isToday(d)
                  ? "border border-[#01959F]"
                  : "border border-transparent"
              }
              hover:bg-[#01959F] hover:text-white
            `}
          >
            {d.date()}
          </div>
        );
      })}
    </div>
  );
}
