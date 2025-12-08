import { useState } from "react";
import { FaClipboardList, FaCheckCircle, FaSpinner, FaUsers } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminOverview = () => {

    const [stats, setStats] = useState({
        totalComplaints: 128,
    pendingComplaints: 34,
    inProgressComplaints: 18,
    resolvedComplaints: 76,
    closedComplaints: 20,
    lowPriorityComplaints: 20,
    mediumPriorityComplaints:40,
    highPriorityComplaints:50,
    criticalPriorityComplaints:18,
    activeEngineers: 9,
    totalRangers: 42,
    })
  // Dummy stats for now

  // Pie Chart Data
  const statusData = [
    { name: "Pending", value: stats.pendingComplaints },
    { name: "In Progress", value: stats.inProgressComplaints },
    { name: "Resolved", value: stats.resolvedComplaints },
    { name: "Closed", value: stats.closedComplaints },
  ];

  const COLORS = ["#FACC15", "#3B82F6", "#22C55E", "#6B7280"];

  // Bar Chart Data
  const priorityData = [
    { priority: "Low", count: stats.lowPriorityComplaints },
    { priority: "Medium", count: stats.mediumPriorityComplaints },
    { priority: "High", count: stats.highPriorityComplaints },
    { priority: "Critical", count: stats.criticalPriorityComplaints },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <p className="text-sm text-gray-500">Summary of system activities</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="Total Complaints" value={stats.totalComplaints} icon={<FaClipboardList className="text-teal-600 text-2xl" />} />
        <StatCard label="Pending" value={stats.pendingComplaints} icon={<FaSpinner className="text-amber-500 text-2xl" />} />
        <StatCard label="In Progress" value={stats.inProgressComplaints} icon={<FaSpinner className="text-blue-500 text-2xl" />} />
        <StatCard label="Resolved" value={stats.resolvedComplaints} icon={<FaCheckCircle className="text-green-600 text-2xl" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie Chart - Complaint Status */}
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Complaint Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={({ name }) => name}
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Priority Breakdown */}
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Complaints by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#14B8A6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
    <div className="p-3 rounded-full bg-gray-50">{icon}</div>
  </div>
);

export default AdminOverview;
