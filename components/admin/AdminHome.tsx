"use client";

import { useGetData } from "@/lib/axiosConfig/FetchData";
import { Loader2 } from "lucide-react"; // loader icon
import { Card } from "../ui/card";

const AdminHome = () => {
  const { data, isLoading, error } = useGetData<any>(
    ["admin-details"],
    "/admin/details"
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Failed to load admin details 😢
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
        {/* Cards */}
        <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform">
          <div className="text-center">
            <p className="font-semibold text-gray-800 text-2xl">Total Users</p>
            <p className="font-semibold text-gray-800 text-2xl">
              {data?.totalUsers}
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform">
          <div className="text-center">
            <p className="font-semibold text-gray-800 text-2xl">
              Today’s Submissions
            </p>
            <p className="font-semibold text-gray-800 text-2xl">
              {data?.todaysSubmissions}
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform">
          <div className="text-center">
            <p className="font-semibold text-gray-800 text-2xl">
              Total Submissions
            </p>
            <p className="font-semibold text-gray-800 text-2xl">
              {data?.totalSubmissions}
            </p>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-3">Users</h1>

        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="min-w-full bg-white/95 backdrop-blur-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm sm:text-base">
                <th className="py-3 px-4 sm:px-5 text-left font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 sm:px-5 text-left font-semibold">
                  Email
                </th>
                <th className="py-3 px-4 sm:px-5 text-left font-semibold">
                  Total Submissions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.submissionCounts?.map((item: any) => (
                <tr
                  key={item.userId}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base"
                >
                  <td className="py-3 px-4 sm:px-5">{item.name}</td>
                  <td className="py-3 px-4 sm:px-5 break-all">{item.email}</td>
                  <td className="py-3 px-4 sm:px-5 font-semibold text-center">
                    {item._count.submition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!data?.submissionCounts?.length && (
            <div className="text-center py-6 text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
