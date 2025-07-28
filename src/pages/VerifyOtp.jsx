import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  // For demo, get sentOtp from location state
  const sentOtp = location.state?.sentOtp || "";
  const email = location.state?.email || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF0] via-white to-[#FFFDF0] font-raleway">
      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center" style={{ minHeight: '420px' }}>
        <div className="w-14 h-14 bg-[#044EBC] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <h2 className="font-extrabold text-[#061A39] text-2xl mb-1">Verify OTP</h2>
        <p className="text-[#044EBC] mb-6 text-center">Enter the 6-digit OTP sent to your email.</p>
        {/* 
          OTP verification UI and logic has been removed in favor of Supabase's email link verification.
        */}
      </div>
    </div>
  );
}
