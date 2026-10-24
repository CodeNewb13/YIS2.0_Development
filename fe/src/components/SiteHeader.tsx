"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ArrowRight, User } from "lucide-react";

interface SiteHeaderProps {
  userLoggedIn?: boolean;
  userName?: string;
}

export function SiteHeader({
  userLoggedIn = false,
  userName = "Alex Pratama",
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9EF] border-b border-[#1C2533] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-10 md:w-16 md:h-12 shrink-0">
            <Image
              src="/YIS_Logo_Dark_Version.jpeg"
              alt="Youth in STEM Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block font-black text-sm md:text-base tracking-tight text-[#1C2533] leading-none">
              YOUTH IN STEM
            </span>
            <span className="block text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#597865] uppercase mt-0.5">
              Indonesia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-[#1C2533]">
          <Link href="/" className="hover:text-[#4C84AB] transition-colors">
            Overview
          </Link>
          <Link href="/home" className="hover:text-[#4C84AB] transition-colors">
            Portal Home
          </Link>
          <Link
            href="/event-list-2"
            className="hover:text-[#4C84AB] transition-colors">
            Events Bento
          </Link>
          <Link
            href="/#classes"
            className="hover:text-[#4C84AB] transition-colors">
            Classes
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {userLoggedIn ? (
            <Link
              href="/home"
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1C2533] text-[#FFF9EF] text-xs font-bold hover:bg-[#2c3b52] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[#EDBD62] text-[#1C2533] flex items-center justify-center font-bold text-xs">
                {userName.charAt(0)}
              </div>
              <span>{userName}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-[#1C2533] hover:text-[#4C84AB] transition-colors">
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EDBD62] text-[#1C2533] text-xs font-black tracking-wide hover:bg-[#f1c779] shadow-sm transition-all hover:translate-x-0.5">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1C2533] focus:outline-none"
          aria-label="Toggle navigation menu">
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#1C2533]/20 flex flex-col gap-3 pb-2 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-2 py-1.5 text-sm font-bold text-[#1C2533] hover:bg-[#1C2533]/5 rounded">
            Overview
          </Link>
          <Link
            href="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="px-2 py-1.5 text-sm font-bold text-[#1C2533] hover:bg-[#1C2533]/5 rounded">
            Portal Home
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="px-2 py-1.5 text-sm font-bold text-[#1C2533] hover:bg-[#1C2533]/5 rounded">
            Log In
          </Link>
          <Link
            href="/sign-up"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-center text-xs font-black text-[#1C2533] bg-[#EDBD62] rounded-full mt-1">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
