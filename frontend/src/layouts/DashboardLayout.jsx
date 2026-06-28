import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClipboardCheck,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "User";

  const fullName = user.fullName || "User";

  const today = new Date().toLocaleDateString();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Students",
      path: "/dashboard/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: <FaBook />,
    },
    {
      name: "Attendance",
      path: "/dashboard/attendance",
      icon: <FaClipboardCheck />,
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];

  const userMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Students",
      path: "/dashboard/students",
      icon: <FaUserGraduate />,
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: <FaBook />,
    },
  ];

  const menu = role === "Admin" ? adminMenu : userMenu;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        <div className="text-center py-6 border-b border-slate-700">

          <h1 className="text-2xl font-bold">
            STUDENT HUB
          </h1>

          <p className="text-slate-300 text-sm">
            {role} Panel
          </p>

        </div>

        <nav className="flex-1 p-4">

          {menu.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition ${
                location.pathname === item.path
                  ? "bg-slate-700 text-white font-semibold"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>

          ))}

        </nav>

        <div className="p-4">

          <button
            onClick={handleLogout}
            className="w-full bg-rose-600 hover:bg-rose-700 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="flex-1">

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-slate-800">
            Student Management Dashboard
          </h2>

          <div className="text-right">

            <p className="font-bold text-slate-800">
              {fullName}
            </p>

            <p className="text-sm text-slate-500">
              {role}
            </p>

            <p className="text-sm text-slate-500">
              {today}
            </p>

          </div>

        </header>

        <main className="p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;