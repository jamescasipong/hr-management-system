import React from "react";

const Hero: React.FC = () => {
  return (
    <section>
      <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
        {" "}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="10"
              floodOpacity="0.15"
            />
          </filter>
          <clipPath id="roundedRect">
            <rect x="75" y="45" width="350" height="310" rx="16" />
          </clipPath>
        </defs>
        <rect x="0" y="0" width="500" height="400" fill="url(#bgGradient)" />
        <circle cx="30" cy="50" r="80" fill="#3b82f6" opacity="0.05" />
        <circle cx="450" cy="350" r="100" fill="#3b82f6" opacity="0.08" />
        <rect
          x="75"
          y="45"
          width="350"
          height="310"
          rx="16"
          fill="white"
          filter="url(#shadow)"
        />
        <path
          d="M 75,80 C 150,50 200,110 275,80 S 400,110 425,80 V 45 H 75 Z"
          fill="#2563eb"
          opacity="0.05"
          clipPath="url(#roundedRect)"
        />
        <rect x="75" y="45" width="350" height="60" rx="16" fill="#f8fafc" />
        <rect x="75" y="45" width="350" height="16" rx="16" fill="#2563eb" />
        <rect
          x="95"
          y="70"
          width="180"
          height="22"
          rx="4"
          fill="#334155"
          opacity="0.8"
        />
        <rect x="95" y="95" width="120" height="6" rx="3" fill="#94a3b8" />
        <rect
          x="335"
          y="75"
          width="70"
          height="26"
          rx="13"
          fill="#f1f5f9"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <circle
          cx="350"
          cy="88"
          r="6"
          stroke="#94a3b8"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="354"
          y1="92"
          x2="358"
          y2="96"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <rect
          x="95"
          y="120"
          width="150"
          height="100"
          rx="8"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <circle
          cx="170"
          cy="170"
          r="30"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <path d="M 170,170 L 170,140 A 30,30 0 0,1 196,185 z" fill="#3b82f6" />
        <path d="M 170,170 L 196,185 A 30,30 0 0,1 155,195 z" fill="#60a5fa" />
        <path d="M 170,170 L 155,195 A 30,30 0 0,1 145,145 z" fill="#93c5fd" />
        <path d="M 170,170 L 145,145 A 30,30 0 0,1 170,140 z" fill="#bfdbfe" />
        <rect x="110" y="130" width="60" height="8" rx="4" fill="#334155" />
        <rect x="110" y="145" width="40" height="5" rx="2.5" fill="#94a3b8" />
        <rect
          x="265"
          y="120"
          width="160"
          height="100"
          rx="8"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <rect x="280" y="130" width="60" height="8" rx="4" fill="#334155" />
        <rect x="280" y="145" width="40" height="5" rx="2.5" fill="#94a3b8" />
        <rect x="290" y="160" width="15" height="50" rx="2" fill="#3b82f6" />
        <rect x="315" y="175" width="15" height="35" rx="2" fill="#60a5fa" />
        <rect x="340" y="155" width="15" height="55" rx="2" fill="#3b82f6" />
        <rect x="365" y="180" width="15" height="30" rx="2" fill="#60a5fa" />
        <rect
          x="95"
          y="235"
          width="315"
          height="100"
          rx="8"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <rect x="110" y="245" width="100" height="10" rx="5" fill="#334155" />
        <g transform="translate(0,0)">
          <rect
            x="110"
            y="265"
            width="80"
            height="60"
            rx="6"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          <circle cx="130" cy="285" r="12" fill="#bfdbfe" />
          <rect x="150" y="275" width="30" height="6" rx="3" fill="#334155" />
          <rect x="150" y="285" width="25" height="5" rx="2.5" fill="#94a3b8" />
          <rect x="115" y="305" width="70" height="10" rx="5" fill="#eff6ff" />
        </g>
        <g transform="translate(95,0)">
          <rect
            x="110"
            y="265"
            width="80"
            height="60"
            rx="6"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          <circle cx="130" cy="285" r="12" fill="#a5b4fc" />
          <rect x="150" y="275" width="30" height="6" rx="3" fill="#334155" />
          <rect x="150" y="285" width="25" height="5" rx="2.5" fill="#94a3b8" />
          <rect x="115" y="305" width="70" height="10" rx="5" fill="#eff6ff" />
        </g>
        <g transform="translate(190,0)">
          <rect
            x="110"
            y="265"
            width="80"
            height="60"
            rx="6"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          <circle cx="130" cy="285" r="12" fill="#fecaca" />
          <rect x="150" y="275" width="30" height="6" rx="3" fill="#334155" />
          <rect x="150" y="285" width="25" height="5" rx="2.5" fill="#94a3b8" />
          <rect x="115" y="305" width="70" height="10" rx="5" fill="#eff6ff" />
        </g>
        <circle cx="390" cy="65" r="8" fill="#4ade80" />
        <circle cx="370" cy="65" r="8" fill="#fb923c" />
        <circle cx="350" cy="65" r="8" fill="#f87171" />
        <circle
          cx="385"
          cy="315"
          r="18"
          fill="url(#cardGradient)"
          filter="url(#shadow)"
        />
        <rect x="377" y="314" width="16" height="2" fill="white" />
        <rect x="384" y="307" width="2" height="16" fill="white" />
        <circle cx="425" cy="225" r="25" fill="#3b82f6" opacity="0.1" />
        <circle cx="75" cy="125" r="30" fill="#3b82f6" opacity="0.1" />
        <path
          d="M 40,320 C 80,280 120,300 160,260 S 220,240 240,220"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.2"
          fill="none"
        />
        <path
          d="M 460,80 C 420,120 380,100 340,140 S 280,160 260,180"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.2"
          fill="none"
        />
      </svg>
    </section>
  );
};

export default Hero;
