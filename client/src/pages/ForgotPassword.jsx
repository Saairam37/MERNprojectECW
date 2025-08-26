import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [ user, setUser ] = useState({ email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://mernprojectecw.onrender.com/api/auth/auth-routes/reset_password', {

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

      navigate('/login'); 

      alert(data.message);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='container d-flex align-items-center justify-content-center min-vh-100'>
        <div className="card shadow p-4" style={{ maxWidth: '420px', width: '100%' }}>
          <form onSubmit={handleSubmit}>

            <h3 className='text-center fw-semibold mb-4'>Let's get you into your account</h3>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs-5">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
            </div>

            <button type="submit" className="btn btn-primary w-100">Send recovery token</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword