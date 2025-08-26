import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

const ResetPassword = () => {

    const { token } = useParams()
    // const {user,SetUser}  = useAuth()

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(password);
        console.log(confirmPassword);

        if (!password && !confirmPassword) {
            setPasswordError('Both password fields are required');
            return
        };

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return
        };

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long ');
            return
        };

        console.log("Reset token:", token);

        try {
            const response = await fetch(`https://mernprojectecw.onrender.com/auth/reset_password_confirm/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            })


            const data = await response.json();

            if (response.ok) {
                setMessage('password reset successfully');
                setPassword('');
                setConfirmPassword('');
                setPasswordError('');

                setMessage('Password reset successfully');
                setTimeout(() => {
                    navigate('/auth/login');
                }, 2000);

            }
            else {
                setPasswordError(data.message || 'Password reset failed');
            }

            navigate('/auth/login')

        }
        catch (err) {
            setPasswordError(err.message || 'Password reset failed');
        }


    }




    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-2xl font-semibold text-center text-gray-800">Reset Your Password</h3>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Reset Password
                        </button>

                        {passwordError && (
                            <div className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg">{passwordError}</div>
                        )}

                        {message && (
                            <div className="mt-4 text-sm text-green-600 bg-green-100 p-2 rounded-lg">{message}</div>
                        )}
                    </form>
                </div>
            </div>

        </>
    )
}

export default ResetPassword