"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Trophy,
  Briefcase,
  Calendar,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

interface OpportunityItem {
  id: number;
  eyebrow: string;
  title: string;
  desc: string;
  deadline: string;
  location: string;
  image: string;
}

const OPPORTUNITIES_DATA: OpportunityItem[] = [
  {
    id: 1,
    eyebrow: "01 / COMPETITION",
    title: "National STEM Circuit & Robotics Championship 2026",
    desc: "Rancang prototipe sirkuit IoT dan mikrokontroler untuk mitigasi bencana bersama dosen ITB.",
    deadline: "30 Nov 2026",
    location: "ITB Bandung & Hybrid",
    image: "/visuals/stem-circuit.jpg",
  },
  {
    id: 2,
    eyebrow: "02 / BOOTCAMP",
    title: "Youth AI & Creative Coding Fellowship",
    desc: "Program intensif 8 pekan membangun software open-source dan penerapan algoritma kecerdasan buatan.",
    deadline: "15 Des 2026",
    location: "Nasional (Daring)",
    image: "/visuals/coding-class.jpg",
  },
  {
    id: 3,
    eyebrow: "03 / GRANT",
    title: "Young Scientists Renewable Energy Lab Grant",
    desc: "Eksperimen langsung di lab sains universitas meneliti sel surya dan material bio-energi.",
    deadline: "10 Jan 2027",
    location: "Lab Riset Terpadu",
    image: "/visuals/science-lab.jpg",
  },
  {
    id: 4,
    eyebrow: "04 / MENTORSHIP",
    title: "STEM Community Peer Tutoring & Mentorship",
    desc: "Mentoring 1-on-1 belajar fisika, kimia, kalkulus, dan logika pemrograman bersama alumni olimpiade.",
    deadline: "Pendaftaran Buka",
    location: "Komunitas Daring",
    image: "/visuals/stem-workshop.jpg",
  },
];

const UNIVERSITY_PARTNERS = [
  {
    name: "Institut Teknologi Bandung",
    code: "ITB",
    event: "Future Engineers Day",
    date: "14 Nov 2026",
    bg: "#BCD5C6",
    color: "#1C2533",
  },
  {
    name: "Universitas Indonesia",
    code: "UI",
    event: "Science & AI Expo",
    date: "02 Des 2026",
    bg: "#CFE4F3",
    color: "#1C2533",
  },
  {
    name: "Universitas Gadjah Mada",
    code: "UGM",
    event: "Inovasi Terapan 2026",
    date: "18 Des 2026",
    bg: "#EDBD62",
    color: "#1C2533",
  },
  {
    name: "Nanyang Tech University",
    code: "NTU",
    event: "ASEAN Youth STEM",
    date: "22 Jan 2027",
    bg: "#E16E68",
    color: "#FFF9EF",
  },
];

export default function IllustratedHomePage() {
  const [user, setUser] = useState({
    name: "Alex Pratama",
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("yis_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setUser({ name: parsed.name });
        } catch (e) {}
      }
    }
  }, []);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % OPPORTUNITIES_DATA.length);
  const prevSlide = () =>
    setActiveSlide(
      (prev) =>
        (prev - 1 + OPPORTUNITIES_DATA.length) % OPPORTUNITIES_DATA.length,
    );

  const currentOpportunity = OPPORTUNITIES_DATA[activeSlide];

  return (
    <div className="min-h-screen bg-[#1C2533] text-[#FFF9EF] flex flex-col antialiased">
      {/* Header strictly matching wireframe: YIS WEBSITE NAME + User Avatar */}
      <header className="bg-[#FFF9EF] border-b-2 border-[#1C2533] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-9 shrink-0">
              <Image
                src="/YIS_Logo_Dark_Version.png"
                alt="YIS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-black text-sm md:text-base tracking-tight text-[#1C2533] leading-none block">
                YIS WEBSITE NAME
              </span>
              <span className="text-[9px] font-bold tracking-[0.18em] text-[#597865] uppercase block mt-0.5">
                Youth in STEM Indonesia
              </span>
            </div>
          </Link>

          {/* Right: Navigation & Avatar */}
          <div className="flex items-center gap-5">
            <nav className="hidden sm:flex items-center gap-5 text-xs font-black text-[#1C2533] uppercase">
              <Link href="/event-list-2" className="hover:text-[#4C84AB]">
                Bento Events
              </Link>
              <Link href="/page" className="hover:text-[#4C84AB]">
                Dashboard View
              </Link>
            </nav>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#4C84AB] border-2 border-[#1C2533] text-[#FFF9EF] flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#1C2533]"
                aria-label="User profile">
                {user.name.charAt(0)}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#FFF9EF] border-2 border-[#1C2533] shadow-[4px_4px_0px_0px_#000] p-2 z-50 text-[#1C2533]">
                  <div className="px-3 py-1.5 border-b border-[#1C2533]/20 font-bold text-xs">
                    {user.name}
                  </div>
                  <div className="py-1 text-xs font-bold">
                    <Link
                      href="/complete-profile"
                      className="block px-3 py-1.5 hover:bg-[#1C2533]/5 rounded">
                      Edit Profile
                    </Link>
                    <Link
                      href="/page"
                      className="block px-3 py-1.5 hover:bg-[#1C2533]/5 rounded">
                      Dashboard View
                    </Link>
                    <Link
                      href="/event-list-2"
                      className="block px-3 py-1.5 hover:bg-[#1C2533]/5 rounded">
                      Event Bento
                    </Link>
                  </div>
                  <div className="pt-1 border-t border-[#1C2533]/20">
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#D44D46] hover:bg-[#D44D46]/10 rounded">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-10 space-y-12 flex-1">
        {/* Welcome Greeting: WELCOME BACK, [NAME]! */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#FFF9EF]/20 pb-5">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#FFF9EF] tracking-tight uppercase">
              WELCOME BACK, <span className="text-[#EDBD62]">{user.name}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-[#BCD5C6] font-semibold mt-1">
              Ruang eksplorasi dan kolaborasi inovator muda STEM Indonesia
            </p>
          </div>

          <Link
            href="/event-list-2"
            className="px-5 py-2.5 rounded-full bg-[#EDBD62] hover:bg-[#f1c779] text-[#1C2533] font-black text-xs uppercase tracking-wider w-fit shadow-[3px_3px_0px_0px_#000]">
            Buka Bento Events →
          </Link>
        </div>

        {/* Section 1: NEW OPPORTUNITIES (Feature Carousel) + PAST ACTIVITIES */}
        <section className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: NEW OPPORTUNITIES (Editorial Split Card like Landing Page) */}
          <div className="lg:col-span-8 bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-[#1C2533] tracking-tight uppercase">
                NEW OPPORTUNITIES
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border-2 border-[#1C2533] bg-[#FFF9EF] hover:bg-[#1C2533] hover:text-[#FFF9EF] flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1C2533]"
                  aria-label="Previous">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border-2 border-[#1C2533] bg-[#FFF9EF] hover:bg-[#1C2533] hover:text-[#FFF9EF] flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1C2533]"
                  aria-label="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Split Visual Card */}
            <div className="grid md:grid-cols-12 gap-6 items-stretch border-2 border-[#1C2533] rounded-xl overflow-hidden bg-[#FFF9EF]">
              <div className="md:col-span-6 relative h-60 md:h-auto min-h-[240px] overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-[#1C2533]">
                <Image
                  src={currentOpportunity.image}
                  alt={currentOpportunity.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533]/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-4xl font-black text-[#FFF9EF]">
                  0{activeSlide + 1}
                </span>
              </div>

              <div className="md:col-span-6 p-6 flex flex-col justify-between bg-[#CFE4F3]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#4C84AB] block mb-2">
                    {currentOpportunity.eyebrow}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#1C2533] leading-snug">
                    {currentOpportunity.title}
                  </h3>
                  <p className="text-xs text-[#31526b] font-semibold mt-2.5 leading-relaxed">
                    {currentOpportunity.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#31526b]/30 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#31526b]">
                    📅 {currentOpportunity.deadline}
                  </span>

                  <Link
                    href="/event-details-2"
                    className="px-4 py-2 rounded-full bg-[#1C2533] text-[#FFF9EF] hover:bg-[#2c3b52] text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_0px_#EDBD62]">
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Dots pagination */}
            <div className="flex items-center justify-center gap-2.5 mt-5">
              {OPPORTUNITIES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all rounded-full ${
                    idx === activeSlide
                      ? "w-8 h-2.5 bg-[#1C2533]"
                      : "w-2.5 h-2.5 bg-[#1C2533]/30 hover:bg-[#1C2533]/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: PAST ACTIVITIES strictly matching wireframe */}
          <div className="lg:col-span-4 bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-[#1C2533] tracking-tight uppercase mb-4 pb-3 border-b-2 border-[#1C2533]/20">
                PAST ACTIVITIES
              </h2>

              <div className="space-y-3">
                {[
                  {
                    num: "1",
                    title: "Microcontroller & IoT Workshop",
                    status: "Selesai",
                    bg: "#DBF9E7",
                    color: "#597865",
                  },
                  {
                    num: "2",
                    title: "National STEM Circuit Hackathon",
                    status: "Lolos Tahap 2",
                    bg: "#FFF9DA",
                    color: "#8C6A1E",
                  },
                  {
                    num: "3",
                    title: "Python Algorithmic Problem Solving",
                    status: "Sedang Berjalan",
                    bg: "#CFE4F3",
                    color: "#4C84AB",
                  },
                ].map((act) => (
                  <div
                    key={act.num}
                    className="p-3.5 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#1C2533] text-[#FFF9EF] font-black text-xs flex items-center justify-center shrink-0">
                      {act.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#1C2533] truncate">
                        {act.title}
                      </p>
                      <span
                        className="inline-block text-[9px] font-black px-2 py-0.5 rounded border border-[#1C2533]/20 mt-1"
                        style={{ backgroundColor: act.bg, color: act.color }}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1C2533]/20 text-center">
              <Link
                href="/page"
                className="text-xs font-black text-[#4C84AB] hover:underline">
                Buka Log Aktivitas &amp; Pengunjung →
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: BROWSE MORE! (4 Rich Visual Cards) */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#FFF9EF] tracking-tight uppercase">
              BROWSE MORE!
            </h2>
            <p className="text-xs text-[#BCD5C6] font-semibold mt-1">
              Eksplorasi ragam rumpun kegiatan STEM
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Competition (Sage #BCD5C6) */}
            <Link
              href="/event-list-2"
              className="rounded-2xl border-2 border-[#1C2533] bg-[#BCD5C6] text-[#1C2533] p-6 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#597865] text-[#FFF9EF] flex items-center justify-center mb-4 border-2 border-[#1C2533]">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Competition
                </h3>
                <p className="text-xs text-[#1C2533]/85 font-bold mt-2 leading-relaxed">
                  Olimpiade sains, turnamen robotika, dan hackathon nasional.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                <span>14 Kompetisi</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Buka →
                </span>
              </div>
            </Link>

            {/* 2. Opportunities (Sky Blue #CFE4F3) */}
            <Link
              href="/event-list-2"
              className="rounded-2xl border-2 border-[#1C2533] bg-[#CFE4F3] text-[#1C2533] p-6 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4C84AB] text-[#FFF9EF] flex items-center justify-center mb-4 border-2 border-[#1C2533]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Opportunities
                </h3>
                <p className="text-xs text-[#1C2533]/85 font-bold mt-2 leading-relaxed">
                  Beasiswa laboratorium, magang siswa, dan research grant.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                <span>28 Program</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Buka →
                </span>
              </div>
            </Link>

            {/* 3. Events (Warm Yellow #EDBD62) */}
            <Link
              href="/event-list-2"
              className="rounded-2xl border-2 border-[#1C2533] bg-[#EDBD62] text-[#1C2533] p-6 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C2533] text-[#EDBD62] flex items-center justify-center mb-4 border-2 border-[#1C2533]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Events
                </h3>
                <p className="text-xs text-[#1C2533]/85 font-bold mt-2 leading-relaxed">
                  Temu komunitas sains, expo karya, kuliah pakar, dan seminar.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                <span>9 Terjadwal</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Buka →
                </span>
              </div>
            </Link>

            {/* 4. Tutoring (Coral Red #E16E68) */}
            <Link
              href="/event-list-2"
              className="rounded-2xl border-2 border-[#1C2533] bg-[#E16E68] text-[#FFF9EF] p-6 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C2533] text-[#FFF9EF] flex items-center justify-center mb-4 border-2 border-[#1C2533]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Tutoring
                </h3>
                <p className="text-xs text-[#FFF9EF]/90 font-bold mt-2 leading-relaxed">
                  Bimbingan 1-on-1 bersama alumni olimpiade sains dan mentor
                  riset.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#FFF9EF]/30 flex items-center justify-between text-xs font-black">
                <span>35 Mentor</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Buka →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 3: UNIVERSITY PARTNERS EVENTS! (4 Colored Cards) */}
        <section className="bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2533] tracking-tight uppercase">
              UNIVERSITY PARTNERS EVENTS!
            </h2>
            <p className="text-xs text-[#597865] font-bold mt-1">
              Kolaborasi resmi bersama perguruan tinggi terkemuka
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNIVERSITY_PARTNERS.map((uni) => (
              <Link
                key={uni.code}
                href="/event-details-2"
                className="p-5 rounded-xl border-2 border-[#1C2533] shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between"
                style={{ backgroundColor: uni.bg, color: uni.color }}>
                <div>
                  <span className="w-8 h-8 rounded-lg bg-[#1C2533] text-[#FFF9EF] font-black text-xs flex items-center justify-center mb-3">
                    {uni.code}
                  </span>
                  <h3 className="font-black text-base leading-snug">
                    {uni.name}
                  </h3>
                  <p className="text-xs font-extrabold mt-1 opacity-90">
                    {uni.event}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                  <span>{uni.date}</span>
                  <span>Registrasi →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#FFF9EF] text-[#1C2533] border-t-2 border-[#1C2533] px-6 py-4 text-center text-xs font-bold">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
