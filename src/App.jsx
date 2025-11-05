import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventView from "./pages/EventView";
import Results from "./pages/Results";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <nav className="p-4 shadow bg-white flex justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">MeetSlot</Link>
          <div className="space-x-4">
            <Link to="/create" className="text-gray-600 hover:text-blue-600">Create</Link>
          </div>
        </nav>
        <div className="flex-grow flex items-center justify-center p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/event/:id" element={<EventView />} />
            <Route path="/results/:id" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
