"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserDashboardHeaderProps {
  currentPath?: string;
  userName?: string;
}

export function UserDashboardHeader({
  currentPath = "/home",
  userName: initialUserName,
}: UserDashboardHeaderProps) {
  const [userName, setUserName] = useState(initialUserName || "Alex Pratama");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yis_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setUserName(parsed.name);
        } catch (e) {}
      }
    }
  }, []);

  const initial = userName ? userName.charAt(0).toUpperCase() : "A";

  return (
    <header className="bg-[#FFF9EF] border-b-2 border-[#1C2533] px-4 sm:px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-9 shrink-0">
            <Image
              src="/YIS Logo Transparent.png"
              alt="Youth in STEM Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-black text-sm md:text-base tracking-tight text-[#1C2533] uppercase leading-none block">
              Youth in STEM
            </span>
            <span className="text-[9px] font-bold tracking-[0.18em] text-[#597865] uppercase block mt-0.5">
              Indonesia
            </span>
          </div>
        </Link>

        {/* Center / Right: Navigation & User Avatar */}
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="flex items-center gap-4 sm:gap-6 text-xs font-black text-[#1C2533] uppercase">
            <Link
              href="/home"
              className={`transition-all hover:text-[#4C84AB] hover:-translate-y-0.5 ${
                currentPath === "/home"
                  ? "text-[#4C84AB] underline underline-offset-4"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/event-list-2"
              className={`transition-all hover:text-[#4C84AB] hover:-translate-y-0.5 ${
                currentPath === "/event-list-2"
                  ? "text-[#4C84AB] underline underline-offset-4"
                  : ""
              }`}
            >
              Events Bento
            </Link>
            <Link
              href="/event-details-2"
              className={`transition-all hover:text-[#4C84AB] hover:-translate-y-0.5 ${
                currentPath === "/event-details-2"
                  ? "text-[#4C84AB] underline underline-offset-4"
                  : ""
              }`}
            >
              Event Details
            </Link>
          </nav>

          {/* User Avatar Circle */}
          <Link
            href="/complete-profile"
            className="w-10 h-10 rounded-full bg-[#4C84AB] border-2 border-[#1C2533] text-[#FFF9EF] flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#1C2533] hover:scale-105 hover:-translate-y-0.5 transition-all shrink-0"
            aria-label="Profile"
            title="Edit Profile"
          >
            {initial}
          </Link>
        </div>
      </div>
    </header>
  );
}
