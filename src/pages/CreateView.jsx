import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EventView() {
  const { id } = useParams();
  const [availability, setAvailability] = useState({});

  const slots = [
    "Tue 10:00 - 11:00",
    "Tue 14:00 - 15:00",
    "Wed 09:00 - 10:00",
  ];

  function toggle(slot) {
    setAvailability((prev) => ({
      ...prev,
      [slot]: prev[slot] === "YES" ? "NO" : "YES",
    }));
  }

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Event {id}</h2>
      <p className="text-gray-500 mb-4">Select the times you’re available:</p>
      <div className="space-y-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => toggle(slot)}
            className={`w-full border rounded-lg py-2 ${
              availability[slot] === "YES"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
        Submit Availability
      </button>
    </div>
  );
}
