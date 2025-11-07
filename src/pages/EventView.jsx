import { useState, useEffect, useRef } from "react";

export default function EventView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const startHour = 9;
  const endHour = 17;
  const incrementMinutes = 15;

  // Flattened time slots (e.g., 9:00, 9:15, 9:30 ...)
  const generateTimeSlots = () => {
    const slots = [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += incrementMinutes) {
        slots.push({ hour: h, minute: m });
      }
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const [selected, setSelected] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragRect, setDragRect] = useState(null);
  const dragMode = useRef(null);
  const dragStart = useRef(null);

  const handleMouseDown = (dayIdx, timeIdx) => {
    const key = `${dayIdx}-${timeIdx}`;
    const isSelected = selected.has(key);
    dragMode.current = isSelected ? "deselect" : "select";
    dragStart.current = { dayIdx, timeIdx };
    setIsDragging(true);
    setDragRect({ startDay: dayIdx, startTime: timeIdx, endDay: dayIdx, endTime: timeIdx });
  };

  const handleMouseEnter = (dayIdx, timeIdx) => {
    if (!isDragging || !dragStart.current) return;
    setDragRect({
      startDay: dragStart.current.dayIdx,
      startTime: dragStart.current.timeIdx,
      endDay: dayIdx,
      endTime: timeIdx,
    });
  };

  const handleMouseUp = () => {
    if (!dragRect) return;
    const { startDay, endDay, startTime, endTime } = dragRect;
    const dMin = Math.min(startDay, endDay);
    const dMax = Math.max(startDay, endDay);
    const tMin = Math.min(startTime, endTime);
    const tMax = Math.max(startTime, endTime);

    const newSelected = new Set(selected);
    for (let d = dMin; d <= dMax; d++) {
      for (let t = tMin; t <= tMax; t++) {
        const key = `${d}-${t}`;
        if (dragMode.current === "select") newSelected.add(key);
        else newSelected.delete(key);
      }
    }
    setSelected(newSelected);
    setIsDragging(false);
    setDragRect(null);
    dragStart.current = null;
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [dragRect]);

  const isInDragRect = (d, t) => {
    if (!isDragging || !dragRect) return false;
    const dMin = Math.min(dragRect.startDay, dragRect.endDay);
    const dMax = Math.max(dragRect.startDay, dragRect.endDay);
    const tMin = Math.min(dragRect.startTime, dragRect.endTime);
    const tMax = Math.max(dragRect.startTime, dragRect.endTime);
    return d >= dMin && d <= dMax && t >= tMin && t <= tMax;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-sm h-[90vh] flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-center flex-shrink-0">
        Select Your Availability
      </h2>

      <div className="flex-1 overflow-x-auto select-none">
        <table className="w-full border-collapse text-sm h-full">
          <thead>
            <tr>
              <th className="w-20 p-2 text-left text-gray-500">Time</th>
              {days.map((d) => (
                <th key={d} className="p-2 text-center text-gray-700 font-medium">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, tIdx) => {
              const label = new Date(0, 0, 0, slot.hour, slot.minute).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              });
              return (
                <tr key={tIdx}>
                  <td className="p-2 text-gray-600 whitespace-nowrap">{label}</td>
                  {days.map((_, dIdx) => {
                    const key = `${dIdx}-${tIdx}`;
                    const isSelected = selected.has(key);
                    const isPreview = isInDragRect(dIdx, tIdx);
                    return (
                      <td
                        key={key}
                        onMouseDown={() => handleMouseDown(dIdx, tIdx)}
                        onMouseEnter={() => handleMouseEnter(dIdx, tIdx)}
                        className={`border cursor-pointer transition-colors duration-100 ${
                          isDragging && isPreview
                            ? dragMode.current === "select"
                              ? "bg-blue-300"
                              : "bg-red-200"
                            : isSelected
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "hover:bg-blue-100"
                        }`}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        {selected.size} slot{selected.size !== 1 && "s"} selected
      </div>
    </div>
  );
}
