import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function EventView() {
  const { id } = useParams();
  const [name, setName] = useState('');
  
  // Mock data - will be replaced with API call
  const event = {
    title: 'Team Meeting',
    description: 'Planning session for Q4',
    dates: ['2025-11-05', '2025-11-06', '2025-11-07'],
    timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {event.title}
          </h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <p className="text-sm text-gray-500">Event ID: {id}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select Your Availability
            </h2>
            <p className="text-gray-600 mb-4">
              Click and drag to select times you're available
            </p>
            
            {/* Placeholder for TimeGrid component */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              <p>Time Grid Component</p>
              <p className="text-sm mt-2">Will be built next</p>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            disabled={!name}
          >
            Submit Availability
          </button>
        </div>
      </div>
    </div>
  );
}

