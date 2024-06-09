"use client";

import Header from "@/app/(components)/Header";

const SettingsPage = () => {
  // Mock user data for display
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  return (
    <div className="p-6">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-600">
            {userSettings.username}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-600">
            {userSettings.email}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team
          </label>
          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-600">
            {userSettings.teamName}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-600">
            {userSettings.roleName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
