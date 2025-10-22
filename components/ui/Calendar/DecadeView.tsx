import dayjs from "dayjs";

function DecadeView({
  date,
  onSelect,
}: {
  date: dayjs.Dayjs;
  onSelect: (y: number) => void;
}) {
  const currentYear = dayjs().year();

  const start = date.startOf("year").subtract(date.year() % 100, "year");
  const decades = Array.from(
    { length: 12 },
    (_, i) => start.year() - 10 + i * 10,
  );

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      {decades.map((y) => {
        const isDisabled = y + 9 > currentYear;

        return (
          <div
            key={y}
            onClick={() => !isDisabled && onSelect(y)}
            className={`p-2 rounded-lg ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-100"
            }`}
          >
            {y}-{y + 9}
          </div>
        );
      })}
    </div>
  );
}

export default DecadeView;
