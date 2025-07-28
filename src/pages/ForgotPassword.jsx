import React, { useState } from "react";
import { supabase } from '../api/supabaseClient';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendReset = async e => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/UpdatePassword',
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("A password reset link has been sent to your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF0] via-white to-[#FFFDF0] font-raleway">
      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center" style={{ minHeight: '420px' }}>
        <div className="w-14 h-14 bg-[#044EBC] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        {error && <div className="text-red-500 text-sm mb-3 w-full text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-3 w-full text-center">{success}</div>}
        <h2 className="font-extrabold text-[#061A39] text-2xl mb-1">Forgot Password?</h2>
        <p className="text-[#044EBC] mb-6 text-center">Enter your email and we'll send you a password reset link.</p>
        <form className="w-full flex flex-col gap-3 mb-4" onSubmit={handleSendReset}>
          <input
            type="email"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#044EBC] hover:bg-[#4B8FF4] text-white font-bold py-2.5 rounded-xl shadow-md transition-all w-full text-base mt-1"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
