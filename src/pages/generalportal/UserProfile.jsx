// pages/user/UserProfile.jsx
import React from 'react'
import ProfilePage from '../../components/ProfilePage'
import { useSelector } from 'react-redux'

function UserProfile() {
  const authStatus = useSelector(state => state.auth.userData)

  return (
    <ProfilePage
      title="User Profile"
      name={authStatus?.name}
      email={authStatus?.email}
      role={authStatus?.role}
      additionalInfo="Welcome to your dashboard"
    />
  )
}

export default UserProfile

