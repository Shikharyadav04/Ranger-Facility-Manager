
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
