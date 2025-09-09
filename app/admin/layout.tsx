"use client";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed max-w-screen inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gray-100 md:ml-72 p-4 pt-16">
        {children}
      </main>
    </div>
  );
}
