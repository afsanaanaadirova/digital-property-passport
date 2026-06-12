import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { TDatepickerProps } from "./TDatepickerProps";
import dayjs from "dayjs";
import "dayjs/locale/az";
import CalendarIcon from "@svg/calendar.svg?react";
import "./datepicker.css";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { FormHelperText } from "@mui/material";

function CustomDatepicker({
  title,
  value,
  error,
  onChange,
  disabled,
  disablePast,
}: TDatepickerProps) {
  const [date, setDate] = useState<unknown | null>(
    value &&  dayjs(value).format("YYYY-MM-DD") !== "1970-01-01" ? dayjs(value) : null
  );

  useUpdateEffect(() => {
    if (value !== undefined && value !== null && dayjs(value).format("YYYY-MM-DD") !== "1970-01-01") {
      setDate(dayjs(value));
    } else {
      setDate(null); 
    }
  }, [value]);

  const CustomCalendarIcon = () => <CalendarIcon />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="az">
      <div>
        <DatePicker
          format="DD-MM-YYYY"
          label={title}
          value={date}
          disableFuture={disablePast || false}
          onChange={(val: any) => {
            setDate(val);
            onChange(val);
          }}
          slots={{
            openPickerIcon: CustomCalendarIcon,
          }}
          slotProps={{
            textField: {
              onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === "Tab") {
                  event.preventDefault(); 
                }
              },
              fullWidth: true,
              variant: "filled",
              InputLabelProps: {
                style: {
                  color: "#697586",
                  padding: "2.5px",
                },
              },
            },
          }}
          sx={{
            "& .MuiFilledInput-root": {
              pointerEvents: disabled ? "none" : "all",
              backgroundColor: disabled ? "#EEF2F6" : "#fff",
              border: `1px solid ${error ? "red" : "#E3E8EF"}`,
            },
          }}
        />
        {error && (
          <FormHelperText sx={{ color: "red" }}>{error.message}</FormHelperText>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default CustomDatepicker;
