// components/admin/Sidebar.tsx
"use client";

import Cookies from "js-cookie";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Manage Users", href: "/admin/all-users" },
    { label: "Questions", href: "/admin/questions" },
    { label: "Add Questions", href: "/admin/add-questions" },
    { label: "Answers", href: "/admin/answers" },
  ];

  const handleLogout = () => {
    Cookies.remove("infolife");
    router.push("/login");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`overflow-x-scroll top-0 left-0 z-40 h-screen w-72 bg-gray-900 text-white flex flex-col p-4 transition-transform duration-300 ease-in-out
          ${
            isMounted
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "-translate-x-full"
          }
          md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-4 mt-4 hidden md:block">
          Admin Panel
        </h2>
        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex px-4 py-3 rounded-md hover:bg-gray-700 transition-colors ${
                    pathname === item.href ? "bg-gray-700 font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            className="flex items-center gap-2 px-4 py-3 rounded-md bg-red-500 hover:bg-red-600 transition-colors w-full text-left"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-700 opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
