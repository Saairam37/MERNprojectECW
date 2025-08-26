import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [ user, setUser ] = useState({ email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://mernprojectecw.onrender.com/api/auth/reset_password', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include'
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      else {
        alert(data.message);

      }

      setUser({ email: '' });

      navigate('/auth/login'); 

      alert(data.message);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
  <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 transform transition-transform hover:scale-105 duration-300">
    <h3 className="text-center text-2xl font-semibold text-gray-800 mb-6">
      Let's get you into your account
    </h3>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Send Recovery Token
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default ForgotPassword