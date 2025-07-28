import React, { useEffect, useState } from "react";
import { handleGoogleCallback } from "@/api/authApi";

export default function GoogleCallback() {
  const [error, setError] = useState("");

  useEffect(() => {
    handleGoogleCallback().catch((err) => {
      setError(err.message || "Google sign-in failed.");
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF0] via-white to-[#FFFDF0] font-raleway">
      <div className="bg-white/95 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center">
        <div className="w-14 h-14 bg-[#044EBC] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </div>
        <h2 className="font-extrabold text-[#061A39] text-2xl mb-1">Signing you in...</h2>
        <p className="text-[#044EBC] mb-6 text-center">Please wait while we complete your Google sign-in.</p>
        {error && <div className="text-red-500 text-sm mb-3 w-full text-center">{error}</div>}
      </div>
    </div>
  );
}
