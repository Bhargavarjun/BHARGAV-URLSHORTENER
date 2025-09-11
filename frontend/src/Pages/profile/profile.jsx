import React, { useState } from "react";

// ProfileCard.jsx
// Usage: <ProfileCard /> or <ProfileCard initial={{ name: "Your Name", roll: "12345", branch: "CSE", photo: "https://..." }} />

export default function ProfileCard({ initial = {} }) {
  const [photo, setPhoto] = useState(initial.photo || "");
  const [name, setName] = useState(initial.name || "Your Name");
  const [roll, setRoll] = useState(initial.roll || "Roll No");
  const [branch, setBranch] = useState(initial.branch || "Branch");

  // handle local image selection
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
            {photo ? (
              <img src={photo} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Photo
              </div>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">Roll: <span className="text-gray-700">{roll}</span></p>
            <p className="text-sm text-gray-500">Branch: <span className="text-gray-700">{branch}</span></p>
          </div>

          <div className="w-full mt-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Upload photo</label>
            <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-600" />
          </div>

          <div className="w-full mt-2 grid grid-cols-1 gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <input
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="Roll number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <input
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Branch"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="w-full flex justify-between mt-3">
            <button
              onClick={() => {
                setPhoto("");
                setName("Your Name");
                setRoll("Roll No");
                setBranch("Branch");
              }}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              onClick={() => {
                // copy profile as JSON to clipboard
                const profile = { name, roll, branch, photo };
                navigator.clipboard?.writeText(JSON.stringify(profile, null, 2));
                alert("Profile copied to clipboard (JSON)!");
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:opacity-95"
            >
              Copy JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
