import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiTool, FiList } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <aside className="w-64 fixed top-0 left-0 h-full bg-white border-r shadow-sm p-6 flex flex-col">

      {/* LOGO / TITLE */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-wide text-teal-700">
          FacilityHub
        </h2>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-3">

        <NavItem
          to="/admin/dashboard"
          label="Overview"
          icon={<FiHome size={20} />}
        />

        <NavItem
          to="/admin/dashboard/complaints"
          label="Complaints"
          icon={<FiList size={20} />}
        />

        <NavItem
          to="/admin/dashboard/engineers"
          label="Engineers"
          icon={<FiUsers size={20} />}
        />

        <NavItem
          to="/admin/dashboard/assign"
          label="Assign Tasks"
          icon={<FiTool size={20} />}
        />

      </nav>

      {/* FOOTER AREA OPTIONAL */}
      <div className="mt-auto text-sm text-gray-400">
        <p>Admin Panel</p>
        <p>v1.0.0</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;



/* ------------------- NavItem Component ------------------- */
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-2 rounded-md transition
        ${isActive ? "bg-teal-600 text-white" : "text-gray-700 hover:bg-gray-100"}
      `
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};
