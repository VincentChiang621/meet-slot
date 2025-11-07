import { useState } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import TimezoneSelect from 'react-timezone-select';
import 'react-day-picker/dist/style.css';
import DateSelector from "../components/DateSelector";
import CreateEventButton from "../components/CreateEventButton";


export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [selectedDays, setSelectedDays] = useState([]);

  // possible increments
  const increments = [15, 30, 60].map((m) => ({ value: m, label: `${m} min` }));

  function addSlot(time) {
    const newSlot = {
      date: moment(selectedDate).format("YYYY-MM-DD"),
      startTime: time,
    };
    setSlots((prev) => [...prev, newSlot]);
  }

  return (
    <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-2">New Event</h2>

      {/* Event name */}
      <div>
        <label className="block text-sm font-medium mb-1">Event name</label>
        <input
          type="text"
          placeholder="e.g. Team Sync or Project Kickoff"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Timezone */}
      <div className="relative z-30">
       <label className="block text-sm font-medium mb-1">Select Timezone</label>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
      </div>

      {/* Minute increment */}
      <div className="relative z-20">
        <label className="block text-sm font-medium mb-1">Time increments</label>
        <Select
          options={increments}
          defaultValue={increments[0]}
          onChange={(opt) => setIncrement(opt.value)}
          className="text-sm"
        />
      </div>

      {/* Calendar date selector */}
      <label className="block text-sm font-medium mb-3 relative z-10">Select dates</label>
      <DateSelector
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      
      {/* Create Event Button*/}
      <CreateEventButton/>
    </div>
  );
}
