import { useAuth } from "../context/authContext";
import { FiBell, FiLogOut, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  // Generate greeting based on time
  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <header className="w-full h-16 px-6 bg-white shadow-sm flex items-center justify-between sticky top-0 z-20">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <FiMenu className="text-gray-600 text-2xl cursor-pointer md:hidden" />

        <h1 className="text-xl font-semibold tracking-wide text-gray-800">
          {greeting}, {user?.fullName?.split(" ")[0]}!
        </h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* Notification Icon */}
        <button className="relative">
          <FiBell className="text-gray-600 text-2xl hover:text-gray-800 transition" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-gray-800">{user?.fullName}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>

          <img
            src={user?.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
        >
          <FiLogOut className="text-xl" />
        </button>

      </div>
    </header>
  );
};

export default Navbar;
