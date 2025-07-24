import React from 'react'
import Leftside from './leftside';
import Rightside from './Rightside';
import LogoutButton from './Logout';
 const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">

      {/* Top Bar */}
      <div className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 border-r overflow-y-auto">
          <Leftside />
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white overflow-y-auto">
          <Rightside />
        </div>
      </div>
    </div>
  )
}


export default Dashboard;