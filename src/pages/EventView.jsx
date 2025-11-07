import { useState, useEffect, useRef } from "react";
import ClearShortcut from "../components/ClearShortcut";

export default function EventView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const startHour = 9;
  const endHour = 17;
  const incrementMinutes = 15;

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
    setDragRect({
      startDay: dayIdx,
      startTime: timeIdx,
      endDay: dayIdx,
      endTime: timeIdx,
    });
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

  const clearAll = () => setSelected(new Set());

  const isInDragRect = (d, t) => {
    if (!isDragging || !dragRect) return false;
    const dMin = Math.min(dragRect.startDay, dragRect.endDay);
    const dMax = Math.max(dragRect.startDay, dragRect.endDay);
    const tMin = Math.min(dragRect.startTime, dragRect.endTime);
    const tMax = Math.max(dragRect.startTime, dragRect.endTime);
    return d >= dMin && d <= dMax && t >= tMin && t <= tMax;
  };

  const totalHours = endHour - startHour;
  const totalBlocks = totalHours * (60 / incrementMinutes);

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      {/* Keyboard listener */}
      <ClearShortcut onClear={clearAll} />

      {/* LEFT: Calendar */}
      <div className="flex-1 bg-white rounded-xl shadow-sm h-[82vh] px-3 py-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Select Your Availability (9 AM – 5 PM)
        </h2>

        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(5,1fr)] mb-1 text-sm font-medium text-gray-600">
          <div></div>
          {days.map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Time + grid */}
        <div className="border border-gray-300 rounded-lg overflow-hidden flex-1">
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: `60px repeat(${days.length}, 1fr)`,
              gridTemplateRows: `repeat(${totalBlocks}, 1fr)`,
            }}
          >
            {/* Time column */}
            {Array.from({ length: totalHours }).map((_, i) => {
              const hour = startHour + i;
              const label = new Date(0, 0, 0, hour).toLocaleTimeString([], {
                hour: "numeric",
              });
              return (
                <div
                  key={hour}
                  className="border-t border-gray-300 border-r border-gray-200 text-right pr-2 font-semibold text-gray-700 text-sm flex items-start"
                  style={{ gridRow: `${i * 4 + 1} / span 4` }}
                >
                  {label}
                </div>
              );
            })}

            {/* Time slots */}
            {Array.from({ length: totalBlocks }).map((_, tIdx) =>
              days.map((_, dIdx) => {
                const key = `${dIdx}-${tIdx}`;
                const isSelected = selected.has(key);
                const isPreview = isInDragRect(dIdx, tIdx);
                const borderTop = tIdx % 4 === 0 ? "border-t border-gray-300" : "";

                return (
                  <div
                    key={key}
                    onMouseDown={() => handleMouseDown(dIdx, tIdx)}
                    onMouseEnter={() => handleMouseEnter(dIdx, tIdx)}
                    className={`border-r border-gray-100 cursor-pointer transition-colors duration-100 ${borderTop} ${
                      isDragging && isPreview
                        ? dragMode.current === "select"
                          ? "bg-blue-300"
                          : "bg-red-200"
                        : isSelected
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "hover:bg-blue-100"
                    }`}
                    style={{ gridColumn: dIdx + 2 }}
                  ></div>
                );
              })
            )}
          </div>
        </div>

        {/* Slot counter + hint */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            {selected.size} slot{selected.size !== 1 && "s"} selected
          </p>
          <p className="text-[11px] text-gray-400 mt-1 italic">
            Press <span className="font-semibold text-gray-600">Esc</span> to clear all selections
          </p>
        </div>
      </div>

      {/* RIGHT: Info panel */}
      <div className="w-64 bg-white rounded-xl shadow-sm h-[82vh] p-4 flex flex-col justify-center items-center text-gray-500 text-sm">
        <p>Event details or participants will go here.</p>
      </div>
    </div>
  );
}
