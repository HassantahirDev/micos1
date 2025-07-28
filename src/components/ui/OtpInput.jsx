import React, { useRef } from "react";

export default function OtpInput({ value = "", onChange }) {
  const inputs = Array(6).fill(0);
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const otpArr = value.split("");
    otpArr[idx] = val[val.length - 1];
    const newOtp = otpArr.join("").padEnd(6, "");
    onChange(newOtp);
    if (idx < 5 && val) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (value[idx]) {
        const otpArr = value.split("");
        otpArr[idx] = "";
        onChange(otpArr.join("").padEnd(6, ""));
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-4">
      {inputs.map((_, idx) => (
        <input
          key={idx}
          ref={el => (inputRefs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="border rounded-xl px-0 py-2 text-2xl text-center focus:outline-none focus:ring-2 transition"
          style={{
            width: "44px",
            height: "54px",
            borderColor: "#4B8FF4",
            fontWeight: 600,
            color: "#061A39",
            background: "#fff",
            borderWidth: 2,
          }}
          value={value[idx] || ""}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
}
