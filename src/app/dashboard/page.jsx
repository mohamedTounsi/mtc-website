export default function DashboardPage() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">
        Welcome Admin 👋
      </h1>
      <p className="text-gray-300">
        Use the sidebar to navigate between different sections of your
        dashboard.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        <div className="bg-[#1a1a1f] p-6 rounded-2xl border border-purple-800 hover:shadow-lg hover:shadow-purple-700/20 transition">
          <h3 className="text-xl font-semibold text-white mb-2">Members</h3>
          <p className="text-gray-400">
            View and manage all registered members.
          </p>
        </div>

        <div className="bg-[#1a1a1f] p-6 rounded-2xl border border-purple-800 hover:shadow-lg hover:shadow-purple-700/20 transition">
          <h3 className="text-xl font-semibold text-white mb-2">
            Event Members
          </h3>
          <p className="text-gray-400">Track users registered for events.</p>
        </div>
      </div>
    </div>
  );
}
