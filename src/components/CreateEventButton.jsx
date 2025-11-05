import { useNavigate } from "react-router-dom";

export default function CreateEventButton() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    // later you’ll call your API to create the event here,
    // then get the eventId (e.g., "abcd123")
    const eventId = "abcd123";
    navigate(`/event/${eventId}`);
  };

  return (
    <button
      onClick={handleCreateEvent}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Create Event
    </button>
  );
}
