const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {/* TOP */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.fullName}
        </h2>

        <p className="text-slate-500 mt-1">
          Here's what's happening today.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;