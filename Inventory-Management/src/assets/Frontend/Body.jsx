import React from 'react';

function Body() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
        Welcome to the Inventory Management System
      </h1>
      <p className="text-xl text-white opacity-80 text-center px-4 md:px-8">
        Manage your inventory with ease. Add, update, and view your products seamlessly.
      </p>
    </div>
  );
}

export default Body;
