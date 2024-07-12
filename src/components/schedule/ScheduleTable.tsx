import { useState, useRef, useEffect, useCallback } from "react";
import { Schedule } from "../../types/schedule";
import "./ScheduleTable.css";

interface ScheduleTableProps {
  schedule: Schedule[];
  onTimeClick: (date: string, time: string) => void;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeSlots = ["09:00", "12:00", "16:00", "18:00"];

const ScheduleTable = (props:ScheduleTableProps) => {
  const { schedule, onTimeClick } = props;
  const tableRef = useRef<HTMLDivElement>(null);
  const [clickedSlots, setClickedSlots] = useState<{ [key: string]: boolean }>({});

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const areAllSlotsClicked = useCallback((index: number) => {
    return timeSlots.every((timeSlot) => schedule[index].times.includes(timeSlot));
  }, [schedule]);


  const getNextColumnToFill = useCallback(() => {
    for (let i = 0; i < schedule.length; i++) {
      if (!areAllSlotsClicked(i)) {
        return i;
      }
    }
    return schedule.length;
  }, [schedule, areAllSlotsClicked]);

  const handleTimeClick = (date: string, time: string) => {
    const slotKey = `${date}-${time}`;
    setClickedSlots((prev) => ({ ...prev, [slotKey]: true }));
    onTimeClick(date, time);
  };

  const handleTableClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const table = tableRef.current;
    if (table && target.closest(".time-cell")) {
      const cell = target.closest("td");
      if (cell) {
        const colIndex = Array.from(cell.parentNode!.children).indexOf(cell);
        if (colIndex !== -1) {
          const nextColIndex = getNextColumnToFill();
          if (colIndex !== nextColIndex) {
            const nextColCell = table.querySelector(
              `td:nth-child(${nextColIndex + 1})`
            );
            if (nextColCell) {
              nextColCell.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
          }
        }
      }
    }
  }, [getNextColumnToFill]);

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener("click", handleTableClick);
    }
    return () => {
      if (table) {
        table.removeEventListener("click", handleTableClick);
      }
    };
  }, [handleTableClick]);


  return (
    <div className="schedule-table" ref={tableRef}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {schedule.map(({ date }, index) => (
                <th key={index}>
                  <div className="day-header">
                    <p className="mb-0">{getDayOfWeek(date)}</p>
                    <div className="fw-normal">{date}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, timeIndex) => (
              <tr key={timeIndex}>
                {schedule.map(({ date, times }, colIndex) => {
                  const slotKey = `${date}-${timeSlot}`;
                  const isDisabled =
                    colIndex !== 0 &&
                    !areAllSlotsClicked(colIndex - 1) &&
                    !clickedSlots[slotKey];

                  return (
                    <td
                      key={`${date}-${timeIndex}`}
                      className={
                        colIndex === getNextColumnToFill() ? "highlighted-column" : ""
                      }
                    >
                      {times.includes(timeSlot) ? (
                        <div
                          className={`d-flex align-items-center justify-content-center time-cell ${isDisabled ? "disabled" : "active"}`}
                          onClick={() =>
                            !isDisabled && handleTimeClick(date, timeSlot)
                          }
                        >
                          {timeSlot}
                        </div>
                      ) : (
                        <div
                          className={`d-flex align-items-center justify-content-center time-cell placeholder ${
                            isDisabled ? "disabled" : ""
                          }`}
                          onClick={() =>
                            !isDisabled && handleTimeClick(date, timeSlot)
                          }
                        >
                          Add time
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
