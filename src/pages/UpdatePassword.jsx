import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '../api/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../store/slices/authSlice';

export default function UpdatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector(state => state.auth);

  const handleUpdatePassword = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // For demo, we don't have accessToken, but in a real flow, you would get it after OTP verification
    dispatch(updatePassword({ email, newPassword }))
      .unwrap()
      .then(() => {
        setSuccess("Password updated! You can now log in.");
        setTimeout(() => navigate("/Login"), 1200);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF0] via-white to-[#FFFDF0] font-raleway">
      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center" style={{ minHeight: '420px' }}>
        <div className="w-14 h-14 bg-[#044EBC] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <h2 className="font-extrabold text-[#061A39] text-2xl mb-1">Update Password</h2>
        <p className="text-[#044EBC] mb-6 text-center">Enter your new password below.</p>
        {(error || reduxError) && <div className="text-red-500 text-sm mb-3 w-full text-center">{error || reduxError}</div>}
        {success && <div className="text-green-600 text-sm mb-3 w-full text-center">{success}</div>}
        <form className="w-full flex flex-col gap-3 mb-4" onSubmit={handleUpdatePassword}>
          <input
            type="password"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#044EBC] hover:bg-[#4B8FF4] text-white font-bold py-2.5 rounded-xl shadow-md transition-all w-full text-base mt-1"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
