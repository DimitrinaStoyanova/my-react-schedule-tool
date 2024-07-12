import React from "react";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  handleClick?: () => void;
}

const DatePicker = (props: DatePickerProps) => {
  const { label, value, onChange, handleClick } = props;
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Date(event.target.value));
  };

  return (
    <div>
      <label>
        {label}
        <input
          type="date"
          value={value ? value.toISOString().substring(0, 10) : ""}
          onChange={handleDateChange}
          onClick={handleClick}
        />
      </label>
    </div>
  );
};

export default DatePicker;
