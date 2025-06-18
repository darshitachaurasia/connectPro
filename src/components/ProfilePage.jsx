// components/ProfilePage.jsx
import React from 'react'

function ProfilePage({ title, name, email, role, additionalInfo }) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>

      <div className="space-y-4">
        <div>
          <label className="font-medium">Name:</label>
          <p className="text-gray-700">{name}</p>
        </div>
        <div>
          <label className="font-medium">Email:</label>
          <p className="text-gray-700">{email}</p>
        </div>
        <div>
          <label className="font-medium">Role:</label>
          <p className="capitalize text-gray-700">{role}</p>
        </div>
        {additionalInfo && (
          <div>
            <label className="font-medium">Additional Info:</label>
            <p className="text-gray-700">{additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

