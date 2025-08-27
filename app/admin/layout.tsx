import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 w-72 h-full bg-gray-900 text-white overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-6 bg-gray-100 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
