"use client";

import { useState } from "react";

type Location = {
  id: number;
  division: string;
  district: string;
  upazila: string;
};

const Page = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const handleAdd = () => {
    if (!division || !district || !upazila) {
      alert("Please fill all fields!");
      return;
    }

    const newLocation: Location = {
      id: Date.now(),
      division,
      district,
      upazila,
    };

    setLocations([...locations, newLocation]);
    setDivision("");
    setDistrict("");
    setUpazila("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Location Management</h1>

      {/* Add Form */}
      <div className="bg-white shadow p-4 rounded mb-6 space-y-3">
        <h2 className="text-lg font-semibold">Add Location</h2>

        <input
          type="text"
          placeholder="Division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Location
        </button>
      </div>

      {/* Location List */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-3">Locations</h2>
        {locations.length === 0 ? (
          <p className="text-gray-500">No locations added yet.</p>
        ) : (
          <ul className="space-y-2">
            {locations.map((loc) => (
              <li
                key={loc.id}
                className="border p-2 rounded flex justify-between"
              >
                <span>
                  <strong>{loc.division}</strong> → {loc.district} →{" "}
                  {loc.upazila}
                </span>
                <button
                  onClick={() =>
                    setLocations(locations.filter((l) => l.id !== loc.id))
                  }
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
