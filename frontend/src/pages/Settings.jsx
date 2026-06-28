import { useState } from "react";

function Settings() {
  const [adminName, setAdminName] = useState("Administrator");

  const handleSave = () => {
    localStorage.setItem("adminName", adminName);
    alert("Settings saved successfully!");
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-xl shadow p-8 max-w-xl">

        <label className="block font-semibold mb-2">
          Administrator Name
        </label>

        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default Settings;