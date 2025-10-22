"use client";

import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

import DayView from "./DayView";
import MonthView from "./MonthView";
import YearView from "./YearView";
import DecadeView from "./DecadeView";

type View = "day" | "month" | "year" | "decade";

interface CalendarProps {
  date?: Dayjs;
  onSelect?: (date: Dayjs) => void;
}

export default function Calendar({ date, onSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(date ?? dayjs());
  const [view, setView] = useState<View>("day");

  const startOfDecade = currentDate
    .startOf("year")
    .subtract(currentDate.year() % 10, "year");

  const next = () => {
    setCurrentDate((prev) => {
      if (view === "day") return prev.add(1, "month");
      if (view === "month") return prev.add(1, "year");
      if (view === "year") return prev.add(10, "year");
      return prev.add(100, "year");
    });
  };

  const prev = () => {
    setCurrentDate((prev) => {
      if (view === "day") return prev.subtract(1, "month");
      if (view === "month") return prev.subtract(1, "year");
      if (view === "year") return prev.subtract(10, "year");
      return prev.subtract(100, "year");
    });
  };

  const handleSelectDay = (selected: Dayjs) => {
    setCurrentDate(selected);
    onSelect?.(selected);
  };

  return (
    <div
      className="max-w-[376px]  h-full w-full border border-[var(--natural-40)] bg-white p-6 rounded-xl select-none"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="text-[var(--natural-100)] hover:text-black"
        >
          «
        </button>

        <h2
          onClick={() =>
            setView(
              view === "day"
                ? "month"
                : view === "month"
                  ? "year"
                  : view === "year"
                    ? "decade"
                    : "day",
            )
          }
          className="cursor-pointer font-bold text-[var(--natural-100)] text-[16px]"
        >
          {view === "day" && currentDate.format("MMM YYYY")}
          {view === "month" && currentDate.format("YYYY")}
          {view === "year" &&
            `${startOfDecade.year()} - ${startOfDecade.year() + 9}`}
          {view === "decade" &&
            `${startOfDecade.year()} - ${startOfDecade.year() + 99}`}
        </h2>

        <button
          onClick={next}
          className="text-[var(--natural-100)] hover:text-black"
        >
          »
        </button>
      </div>

      {view === "day" && (
        <DayView date={currentDate} onSelect={handleSelectDay} />
      )}

      {view === "month" && (
        <MonthView
          date={currentDate}
          onSelect={(month) => {
            setCurrentDate(currentDate.month(month));
            setView("day");
          }}
        />
      )}

      {view === "year" && (
        <YearView
          date={currentDate}
          onSelect={(year) => {
            setCurrentDate(currentDate.year(year));
            setView("month");
          }}
        />
      )}

      {view === "decade" && (
        <DecadeView
          date={currentDate}
          onSelect={(year) => {
            setCurrentDate(currentDate.year(year));
            setView("year");
          }}
        />
      )}
    </div>
  );
}
