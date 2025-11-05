import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateSelector({ selectedDays, setSelectedDays }) {
  // Disable all past days
  const disabledDays = [{ before: new Date() }];

  return (
    <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={setSelectedDays}
        disabled={disabledDays}
        className="mx-auto"
        styles={{
          caption: {
            color: "#1e293b",
            fontWeight: 600,
            textAlign: "center",
          },
          day: { borderRadius: "50%" },
        }}
        modifiersStyles={{
          selected: {
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "50%",
          },
          today: {
            border: "none",
            color: "black",
          },
          disabled: {
            color: "#d1d5db", // gray-300
            cursor: "not-allowed",
          },
        }}
      />
    </div>
  );
}
