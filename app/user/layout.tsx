import TopNav from "@/components/user/TopNav";
import UserBottomNav from "@/components/user/UserBottomNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main className="pt-10 pb-24">{children}</main>
      <UserBottomNav />
    </>
  );
}
