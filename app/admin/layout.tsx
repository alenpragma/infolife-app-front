// layouts/AdminLayout.tsx
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed ">
        <Sidebar />
      </div>

      <main className="flex-1 min-h-screen bg-gray-100">
        <div>
          <h2 className="text-2xl bg-gray-900 font-bold h-14 text-white hidden md:block"></h2>
          {children}
        </div>
      </main>
    </div>
  );
}
