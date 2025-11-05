export default function Home() {
  return (
    <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-semibold mb-4">MeetSlot</h1>
      <p className="text-gray-500 mb-6">
        Schedule meetings effortlessly with friends, classmates, or colleagues.
      </p>
      <a
        href="/create"
        className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
      >
        Get Started
      </a>
    </div>
  );
}
