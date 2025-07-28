import React, { useState } from "react";
import { supabase } from '../api/supabaseClient';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signup as signupThunk } from '../store/slices/authSlice';
import { loginWithGoogle } from '../api/authApi';

export default function SignUp({ onSwitchToLogin }) {
  const [name, setName] = useState(""); // Add this line
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [googleError, setGoogleError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector(state => state.auth);

  const handleEmailSignUp = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    dispatch(signupThunk({ email, password, name })) // Pass name here
      .unwrap()
      .then(() => setSuccess("Check your email to confirm your account."))
      .catch(() => {});
  };

  const handleGoogleSignUp = async () => {
    setGoogleError("");
    try {
      await loginWithGoogle();
      // On success, Supabase will redirect
    } catch (err) {
      setGoogleError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF0] via-white to-[#FFFDF0] font-raleway">
      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center" style={{ minHeight: '440px' }}>
        <div className="w-32 h-32 bg-white flex items-center justify-center mb-6">
          <img src="/assets/logo.png" alt="MicDropOS Logo" className="w-28 h-28 object-contain" />
        </div>
        <h2 className="font-extrabold text-[#061A39] text-2xl mb-1">Create your account</h2>
        <p className="text-[#044EBC] mb-6 text-center">Sign up to access your AI Content Assistant</p>
        {(error || reduxError) && <div className="text-red-500 text-sm mb-3 w-full text-center">{error || reduxError}</div>}
        {success && <div className="text-green-600 text-sm mb-3 w-full text-center">{success}</div>}
        {googleError && <div className="text-red-500 text-sm mb-2 w-full text-center">{googleError}</div>}
        <form className="w-full flex flex-col gap-3 mb-4" onSubmit={handleEmailSignUp}>
          <input
            type="text"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="border border-[#4B8FF4] rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#4B8FF4] bg-white placeholder-[#044EBC] transition"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#044EBC] hover:bg-[#4B8FF4] text-white font-bold py-2.5 rounded-xl shadow-md transition-all w-full text-base mt-1"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center gap-3 bg-white border border-[#4B8FF4] hover:bg-[#FBD85E] text-[#044EBC] font-semibold py-2.5 px-6 rounded-xl shadow transition-all w-full justify-center mb-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.9-6.9C36.68 2.36 30.7 0 24 0 14.82 0 6.73 5.06 2.69 12.44l8.06 6.26C12.6 13.13 17.88 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.18 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.75 28.7c-1.13-3.36-1.13-6.98 0-10.34l-8.06-6.26C.98 15.1 0 19.41 0 24c0 4.59.98 8.9 2.69 12.44l8.06-6.26z"/><path fill="#EA4335" d="M24 48c6.7 0 12.68-2.21 16.92-6.01l-7.18-5.59c-2.01 1.35-4.59 2.15-7.74 2.15-6.12 0-11.4-3.63-13.25-8.7l-8.06 6.26C6.73 42.94 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Sign up with Google
        </button>
        <div className="flex w-full justify-end mt-2 text-sm">
          <button onClick={() => navigate('/Login')} className="text-[#044EBC] hover:text-[#F6C402] underline transition">Already have an account? Log in</button>
        </div>
        <div className="text-xs text-[#061A39] mt-4 text-center">By signing up, you agree to our Terms and Privacy Policy.</div>
      </div>
    </div>
  );
}
