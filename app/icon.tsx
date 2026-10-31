import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090d16",
          borderRadius: "8px",
          border: "1.5px solid rgba(6, 182, 212, 0.5)",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="iconGrad"
              x1="6"
              y1="6"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path
            d="M12 8V27L15.5 32"
            stroke="url(#iconGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.5 8L28 13V32"
            stroke="url(#iconGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22L17.5 17H28"
            stroke="#22d3ee"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="8" r="2.6" fill="#06b6d4" />
          <circle cx="28" cy="32" r="2.6" fill="#10b981" />
          <circle cx="20" cy="17" r="2.2" fill="#34d399" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
