import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    recentStudents: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const chartData = [
    {
      name: "Active",
      value: stats.activeStudents,
    },
    {
      name: "Inactive",
      value: stats.inactiveStudents,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

          <h2 className="text-lg">
            Total Students
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalStudents}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

          <h2 className="text-lg">
            Total Courses
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.totalCourses}
          </p>

        </div>

        <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

          <h2 className="text-lg">
            Active Students
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.activeStudents}
          </p>

        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

          <h2 className="text-lg">
            Inactive Students
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.inactiveStudents}
          </p>

        </div>

      </div>

      {/* Charts + Recent Students */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Student Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Recent Students */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Students
          </h2>

          {stats.recentStudents &&
          stats.recentStudents.length > 0 ? (

            <div className="space-y-4">

              {stats.recentStudents.map((student) => (

                <div
                  key={student._id}
                  className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
                >

                  <div>

                    <p className="font-semibold">
                      {student.firstName} {student.lastName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {student.course}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      student.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {student.status}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-gray-500">
              No recent students found.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;