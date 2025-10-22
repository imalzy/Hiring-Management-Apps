import dayjs from "dayjs";

function YearView({
  date,
  onSelect,
}: {
  date: dayjs.Dayjs;
  onSelect: (y: number) => void;
}) {
  const currentYear = date.year();
  const startOfDecade = Math.floor(currentYear / 10) * 10;
  const years = Array.from({ length: 12 }, (_, i) => startOfDecade - 1 + i);

  return (
    <div className="grid grid-cols-3 gap-3 text-center text-sm">
      {years.map((y) => {
        const isDisabled = y < startOfDecade || y > startOfDecade + 9;
        const isSelected = y === currentYear;

        return (
          <div
            key={y}
            onClick={() => !isDisabled && onSelect(y)}
            className={`
              py-2 rounded-md transition-colors
              ${isSelected ? "bg-[#01959F] text-white" : ""}
              ${
                isDisabled
                  ? "text-[var(--natural-40)] cursor-not-allowed"
                  : "cursor-pointer text-[var(--natural-90)] hover:bg-gray-100"
              }
            `}
          >
            {y}
          </div>
        );
      })}
    </div>
  );
}

export default YearView;
