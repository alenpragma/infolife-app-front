"use client";

import { Menu } from "lucide-react"; // optional icon, install lucide-react
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Manage Users", href: "/admin/all-users" },
    { label: "Questions", href: "/admin/questions" },
    { label: "Add Questions", href: "/admin/add-questions" },
    { label: "Answers", href: "/admin/answers" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between  p-4 text-white">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white   flex flex-col p-4 transition-transform duration-300
        fixed md:static top-0 h-full z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-8 hidden md:block">Admin Panel</h2>

        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                  pathname === item.href ? "bg-gray-700 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)} // close menu on mobile
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
