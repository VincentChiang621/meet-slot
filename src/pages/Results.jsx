export default function Results() {
  const bestSlot = "Tue 14:00 - 15:00";
  const yesCount = 4;

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Best Time</h2>
      <p className="text-gray-600 mb-4">
        The best meeting time based on availability:
      </p>
      <div className="bg-blue-100 text-blue-700 py-3 rounded-xl font-medium">
        {bestSlot} ({yesCount} available)
      </div>
    </div>
  );
}
