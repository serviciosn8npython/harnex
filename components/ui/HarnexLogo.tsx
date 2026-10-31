import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface HarnexLogoProps {
  className?: string;
}

export function HarnexLogo({ className }: HarnexLogoProps) {
  const uid = useId().replace(/:/g, "");
  const primaryGradId = `harnex-grad-${uid}`;
  const accentGradId = `harnex-accent-${uid}`;
  const borderGradId = `harnex-border-${uid}`;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Harnex Logo"
      role="img"
      className={cn("h-8 w-8 shrink-0 select-none", className)}
    >
      <defs>
        <linearGradient
          id={primaryGradId}
          x1="6"
          y1="6"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <linearGradient
          id={accentGradId}
          x1="32"
          y1="8"
          x2="8"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        <linearGradient
          id={borderGradId}
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#1e293b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Base hexagonal/squircle dark container */}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="10"
        fill="#090d16"
        stroke={`url(#${borderGradId})`}
        strokeWidth="1.5"
      />

      {/* Subtle inner circuit grid lines */}
      <path
        d="M7 13H11M29 27H33"
        stroke={`url(#${primaryGradId})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />

      {/* Left vertical pillar of the geometric 'H' with angled circuit trace */}
      <path
        d="M12.5 9.5V26.5L15.5 30.5"
        stroke={`url(#${primaryGradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right vertical pillar of the geometric 'H' with top circuit entry */}
      <path
        d="M24.5 9.5L27.5 13.5V30.5"
        stroke={`url(#${primaryGradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Intertwined diagonal circuit crossbar connecting the 'H' */}
      <path
        d="M12.5 22.5L17.5 17.5H22.5L27.5 17.5"
        stroke={`url(#${accentGradId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary lower circuit bridge */}
      <path
        d="M12.5 22.5H19L23 26.5H27.5"
        stroke={`url(#${primaryGradId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.85"
      />

      {/* Technological circuit nodes */}
      <circle cx="12.5" cy="9.5" r="2.2" fill="#06b6d4" />
      <circle cx="27.5" cy="30.5" r="2.2" fill="#10b981" />
      <circle
        cx="20"
        cy="17.5"
        r="2.1"
        fill="#090d16"
        stroke="#22d3ee"
        strokeWidth="1.8"
      />
      <circle cx="15.5" cy="30.5" r="1.6" fill="#34d399" />
      <circle cx="24.5" cy="9.5" r="1.6" fill="#22d3ee" />
    </svg>
  );
}
