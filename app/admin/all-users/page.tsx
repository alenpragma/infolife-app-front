"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  position: string;
  img: string;
  location: string;
};

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin");
      setUsers(res.data.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <Link
          href="/admin/all-users/create-user"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add User
        </Link>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users?.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white shadow rounded-lg border flex justify-between items-center"
            >
              <div className="flex gap-5">
                <div>
                  <Image
                    alt=""
                    src={user.img}
                    width={100}
                    height={100}
                    className="rounded-full"
                  ></Image>
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">Role: {user.role}</p>
                  <p className="text-sm text-gray-600">
                    Location: {user.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Position: {user.position}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/all-users/${user.id}`}
                  className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
1;
