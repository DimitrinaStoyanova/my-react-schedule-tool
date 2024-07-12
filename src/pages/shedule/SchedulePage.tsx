import { useState } from "react";
import { addDays, format } from "date-fns";

import { type DaySchedule } from "../../types/schedule";

import DatePicker from "../../components/schedule/DatePicker";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import UploadButton from "../../components/buttons/UploadButton";

import "./SchedulePage.css";

const timeSlots = ["09:00", "12:00", "16:00", "18:00"];
const defaultDuration = 14;

const SchedulePage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  const updateSchedule = (start: Date, end: Date) => {
    const length =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    setSchedule(
      Array.from({ length }, (_, i) => ({
        date: format(addDays(start, i), "yyyy-MM-dd"),
        times: [],
      }))
    );
  };

  const handleStartDateChange = (date: Date) => {
    if (!endDate) {
      const newEndDate = addDays(date, defaultDuration - 1);
      setStartDate(date);
      setEndDate(newEndDate);
      updateSchedule(date, newEndDate);
    } else {
      const duration =
        (endDate.getTime() - (startDate ? startDate.getTime() : date.getTime())) /
        (1000 * 60 * 60 * 24);
      const newEndDate = addDays(date, duration);
      setStartDate(date);
      setEndDate(newEndDate);
      updateSchedule(date, newEndDate);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate) {
      setEndDate(date);
      updateSchedule(startDate, date);
    } else {
      const newStartDate = addDays(date, -defaultDuration + 1);
      setStartDate(newStartDate);
      setEndDate(date);
      updateSchedule(newStartDate, date);
    }
  };

  const handleUpload = () => {
    const jsonSchedule = JSON.stringify(
      {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        schedule: schedule.map((day) => ({
          date: day.date,
          times: day.times,
        })),
      },
      null,
      2
    );
    console.log("Uploaded JSON:", jsonSchedule);
  };

  const handleTimeClick = (date: string, time: string) => {
    const dayIndex = schedule.findIndex((day) => day.date === date);

    if (dayIndex !== -1) {
      const updatedSchedule = [
        ...schedule.slice(0, dayIndex),
        {
          ...schedule[dayIndex],
          times: [...schedule[dayIndex].times, time],
        },
        ...schedule.slice(dayIndex + 1),
      ];

      setSchedule(updatedSchedule);
    }
  };

  const handleAutocomplete = () => {
    const updatedSchedule = schedule.map((day) => ({
      ...day,
      times: timeSlots,
    }));

    setSchedule(updatedSchedule);
  };

  const handleResetTable = () => {
    setSchedule(schedule.map((day) => ({ ...day, times: [] })));
  };

  const isDateRangeValid = startDate !== null && endDate !== null;
  const isAnySlotEmpty = schedule.some(
    (day) => day.times.length < timeSlots.length
  );

  return (
    <>
      <div className="d-flex gap-3">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        {schedule && schedule.length > 0 && <p>{schedule.length} days</p>}
      </div>
      <hr />

      {isDateRangeValid && (
        <>
          <div className="schedule-table-container">
            <ScheduleTable schedule={schedule} onTimeClick={handleTimeClick} />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-dark" onClick={handleResetTable}>
              Reset
            </button>
            <button
              className="btn-autocomplete"
              onClick={handleAutocomplete}
            >
              Autocomplete
            </button>
            <UploadButton
              onUpload={handleUpload}
              disabled={!isDateRangeValid || isAnySlotEmpty}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SchedulePage;
