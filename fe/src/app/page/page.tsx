"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Clock, Trophy, Briefcase, GraduationCap } from "lucide-react";

const OPPORTUNITIES = [
  {
    id: 1,
    eyebrow: "01 / COMPETITION",
    title: "National STEM Circuit & Robotics Championship 2026",
    desc: "Rancang prototipe sirkuit IoT dan mikrokontroler untuk mitigasi bencana alam bersama dosen ITB.",
    deadline: "30 Nov 2026",
    location: "ITB Bandung & Hybrid",
    image: "/visuals/stem-circuit.jpg",
  },
  {
    id: 2,
    eyebrow: "02 / BOOTCAMP",
    title: "Youth AI & Creative Coding Fellowship",
    desc: "Program intensif 8 pekan membangun software open-source dan penerapan algoritma machine learning.",
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
    title: "STEM Community Peer Tutoring Circle",
    desc: "Bimbingan 1-on-1 belajar fisika, kimia, kalkulus, dan logika pemrograman bersama alumni olimpiade.",
    deadline: "Pendaftaran Buka",
    location: "Komunitas Daring",
    image: "/visuals/stem-workshop.jpg",
  },
];

const UPCOMING_PER_CATEGORY: Record<string, Array<{ title: string; date: string; loc: string }>> = {
  Competition: [
    { title: "National STEM Circuit & Robotics Championship", date: "28 - 30 Nov 2026", loc: "Bandung" },
    { title: "Indonesia Youth AI & IoT Hackathon", date: "05 Des 2026", loc: "Daring" },
    { title: "ITB Robotic Combat Challenge", date: "20 Des 2026", loc: "Bandung" },
  ],
  Opportunities: [
    { title: "High School STEM Summer Fellowship", date: "01 Des 2026", loc: "Jakarta" },
    { title: "BRIN Student Researcher Internship", date: "15 Jan 2027", loc: "Bogor" },
  ],
  Events: [
    { title: "National Youth STEM Summit", date: "25 Nov 2026", loc: "Jakarta" },
    { title: "Astronomy Night & Planetarium Tour", date: "12 Des 2026", loc: "Jakarta" },
  ],
  Tutoring: [
    { title: "Kalkulus & Aljabar Linear Intensif", date: "Setiap Sabtu", loc: "Daring" },
    { title: "Persiapan Mekanika Fisika Lanjutan", date: "Setiap Minggu", loc: "Daring" },
  ],
};

const UNI_PARTNERS = [
  { name: "Institut Teknologi Bandung", code: "ITB", event: "Future Engineers Day", date: "14 Nov 2026", bg: "#BCD5C6", color: "#1C2533" },
  { name: "Universitas Indonesia", code: "UI", event: "Science & AI Expo", date: "02 Des 2026", bg: "#CFE4F3", color: "#1C2533" },
  { name: "Universitas Gadjah Mada", code: "UGM", event: "Inovasi Terapan 2026", date: "18 Des 2026", bg: "#EDBD62", color: "#1C2533" },
  { name: "Nanyang Tech University", code: "NTU", event: "ASEAN Youth STEM", date: "22 Jan 2027", bg: "#E16E68", color: "#FFF9EF" },
];

export default function IllustratedDashboardPage() {
  const [userName, setUserName] = useState("Alex Pratama");
  const [slide, setSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"Competition" | "Opportunities" | "Events" | "Tutoring">("Competition");

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

  const curOpp = OPPORTUNITIES[slide];

  return (
    <div className="min-h-screen bg-[#1C2533] text-[#FFF9EF] flex flex-col antialiased">
      {/* Top Header strictly matching wireframe: STEM logo + YIS WEBSITE NAME + User Avatar */}
      <header className="bg-[#FFF9EF] border-b-2 border-[#1C2533] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-9">
              <Image src="/YIS Logo Transparent.png" alt="YIS Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="font-black text-sm md:text-base tracking-tight text-[#1C2533] block leading-none">
                YIS WEBSITE NAME
              </span>
              <span className="text-[9px] font-bold tracking-[0.18em] text-[#597865] uppercase block mt-0.5">
                Youth in STEM Indonesia
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-black text-[#1C2533] uppercase">
            <Link href="/home" className="hover:text-[#4C84AB]">Home</Link>
            <Link href="/event-list-2" className="hover:text-[#4C84AB]">Events Bento</Link>
            <Link href="/event-details-2" className="hover:text-[#4C84AB]">Event Details</Link>
          </nav>

          {/* User Avatar Circle from wireframe */}
          <Link
            href="/complete-profile"
            className="w-10 h-10 rounded-full bg-[#4C84AB] border-2 border-[#1C2533] text-[#FFF9EF] flex items-center justify-center font-black text-sm hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_#1C2533]"
            aria-label="Profile"
          >
            {userName.charAt(0)}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-10 space-y-12 flex-1">
        {/* Welcome Greeting: WELCOME BACK, [NAME]! */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#FFF9EF]/20 pb-5">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#FFF9EF] tracking-tight uppercase">
              WELCOME BACK, <span className="text-[#EDBD62]">{userName}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-[#BCD5C6] font-semibold mt-1">
              Jelajahi program terbaru, pantau riwayat kegiatan, dan agenda kampus mitra
            </p>
          </div>

          <Link
            href="/event-list-2"
            className="px-5 py-2.5 rounded-full bg-[#EDBD62] hover:bg-[#f1c779] text-[#1C2533] font-black text-xs uppercase tracking-wider w-fit shadow-[3px_3px_0px_0px_#000]"
          >
            Lihat Semua Acara →
          </Link>
        </div>

        {/* Section 1: New Opportunities (Feature Carousel) + Past Activities & Profile Visits */}
        <div className="space-y-6">
          {/* New Opportunities: Editorial Feature Grid inspired by landing page */}
          <div className="bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#1C2533] uppercase tracking-tight">
                New Opportunities
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSlide((prev) => (prev - 1 + OPPORTUNITIES.length) % OPPORTUNITIES.length)}
                  className="w-9 h-9 rounded-full border-2 border-[#1C2533] bg-[#FFF9EF] hover:bg-[#1C2533] hover:text-[#FFF9EF] flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1C2533]"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSlide((prev) => (prev + 1) % OPPORTUNITIES.length)}
                  className="w-9 h-9 rounded-full border-2 border-[#1C2533] bg-[#FFF9EF] hover:bg-[#1C2533] hover:text-[#FFF9EF] flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#1C2533]"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Feature Slide Layout */}
            <div className="grid md:grid-cols-12 gap-6 items-stretch border-2 border-[#1C2533] rounded-xl overflow-hidden bg-[#FFF9EF]">
              {/* Photo on left */}
              <div className="md:col-span-6 relative h-64 md:h-auto min-h-[260px] overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-[#1C2533]">
                <Image
                  src={curOpp.image}
                  alt={curOpp.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533]/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-4xl font-black text-[#FFF9EF] tracking-tight">
                  0{slide + 1}
                </span>
              </div>

              {/* Info on right (styled in Blue block like landing page .opportunity-info) */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#CFE4F3]">
                <div>
                  <span className="text-[10px] font-black tracking-[0.16em] uppercase text-[#4C84AB] block mb-2">
                    {curOpp.eyebrow}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1C2533] tracking-tight leading-snug">
                    {curOpp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#31526b] font-semibold mt-3 leading-relaxed">
                    {curOpp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#31526b]/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-bold text-[#31526b] space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Batas: {curOpp.deadline}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {curOpp.location}
                    </p>
                  </div>

                  <Link
                    href="/event-details-2"
                    className="px-5 py-2.5 rounded-full bg-[#1C2533] text-[#FFF9EF] hover:bg-[#2c3b52] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#EDBD62]"
                  >
                    <span>Detail Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Dots Pagination */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {OPPORTUNITIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlide(idx)}
                  className={`transition-all rounded-full ${
                    idx === slide ? "w-8 h-2.5 bg-[#1C2533]" : "w-2.5 h-2.5 bg-[#1C2533]/30 hover:bg-[#1C2533]/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Past Activities (Left) + Profile Visits (Right) */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Left: Past Activities Card */}
            <div className="md:col-span-6 bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1C2533] uppercase tracking-tight mb-4 pb-3 border-b-2 border-[#1C2533]/20">
                  Past Activities
                </h2>

                <div className="space-y-3">
                  {[
                    { id: "01", title: "Workshop Mikrokontroler & IoT Sensor", date: "28 Sep 2026", status: "Sertifikat Terbit", bg: "#DBF9E7", color: "#597865" },
                    { id: "02", title: "National STEM Circuit Hackathon", date: "04 Okt 2026", status: "Lolos Tahap 2", bg: "#FFF9DA", color: "#8C6A1E" },
                    { id: "03", title: "Python Data Science Masterclass", date: "Aktif", status: "Modul 3/6", bg: "#CFE4F3", color: "#4C84AB" },
                  ].map((act) => (
                    <div key={act.id} className="p-3.5 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#1C2533] text-[#FFF9EF] font-black text-xs flex items-center justify-center shrink-0">
                        {act.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-[#1C2533] truncate">{act.title}</p>
                        <p className="text-[10px] text-[#597865] font-bold">{act.date}</p>
                      </div>
                      <span
                        className="text-[9px] font-black px-2 py-0.5 rounded border border-[#1C2533]/30 shrink-0"
                        style={{ backgroundColor: act.bg, color: act.color }}
                      >
                        {act.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1C2533]/20 text-center">
                <Link href="/event-list-2" className="text-xs font-black text-[#4C84AB] hover:underline">
                  Lihat Arsip Kegiatan Lengkap →
                </Link>
              </div>
            </div>

            {/* Right: Profile Visits */}
            <div className="md:col-span-6 bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-7 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#1C2533]/20">
                  <h2 className="text-xl font-black text-[#1C2533] uppercase tracking-tight">
                    Profile Visits
                  </h2>
                  <span className="text-[10px] font-black uppercase text-[#597865] bg-[#BCD5C6] px-2.5 py-0.5 rounded border border-[#1C2533]">
                    Bulan Ini
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center mb-5">
                  <div className="p-3 rounded-xl border-2 border-[#1C2533] bg-[#CFE4F3]">
                    <span className="block text-2xl font-black text-[#1C2533]">142</span>
                    <span className="text-[9px] font-black text-[#4C84AB] uppercase">Total Views</span>
                  </div>
                  <div className="p-3 rounded-xl border-2 border-[#1C2533] bg-[#EDBD62]">
                    <span className="block text-2xl font-black text-[#1C2533]">18</span>
                    <span className="text-[9px] font-black text-[#1C2533] uppercase">Mentor Riset</span>
                  </div>
                  <div className="p-3 rounded-xl border-2 border-[#1C2533] bg-[#DBF9E7]">
                    <span className="block text-2xl font-black text-[#597865]">+24%</span>
                    <span className="text-[9px] font-black text-[#597865] uppercase">Pertumbuhan</span>
                  </div>
                </div>

                {/* Tactile Weekly Activity Bar Chart */}
                <div className="p-3.5 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF]">
                  <span className="text-[10px] font-black uppercase text-[#597865] block mb-2">Aktivitas Mingguan</span>
                  <div className="flex items-end justify-between h-14 gap-1.5 pt-1">
                    {[35, 60, 45, 80, 65, 95, 75].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-[#1C2533] rounded-t hover:bg-[#EDBD62] transition-colors"
                          style={{ height: `${val}%` }}
                        />
                        <span className="text-[8px] font-black text-[#597865]">
                          {["S", "S", "R", "K", "J", "S", "M"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1C2533]/20 text-center">
                <Link href="/complete-profile" className="text-xs font-black text-[#4C84AB] hover:underline">
                  Kelola Minat &amp; Portofolio Siswa →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: BROWSE MORE! strictly matching wireframe with Upcoming Box */}
        <section className="bg-[#151e2b] border-2 border-[#FFF9EF]/20 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#FFF9EF] uppercase tracking-tight">
              BROWSE MORE!
            </h2>
            <p className="text-xs text-[#BCD5C6] font-semibold mt-1">Pilih kategori untuk melihat agenda kegiatan mendatang</p>
          </div>

          {/* Tab buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-[#1C2533] rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#000]">
            {(["Competition", "Opportunities", "Events", "Tutoring"] as const).map((cat) => {
              const isActive = activeTab === cat;
              const bg = cat === "Competition" ? "#BCD5C6" : cat === "Opportunities" ? "#CFE4F3" : cat === "Events" ? "#EDBD62" : "#E16E68";
              const textColor = cat === "Tutoring" ? "#FFF9EF" : "#1C2533";
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`py-4 px-3 text-center text-xs md:text-sm font-black uppercase tracking-wider transition-all border-r border-[#1C2533] last:border-r-0 ${
                    isActive ? "ring-2 ring-[#FFF9EF] z-10" : "opacity-90 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: bg, color: textColor }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dropped down "Upcoming:" Container */}
          <div
            className="mt-4 p-6 rounded-xl border-2 border-[#1C2533] shadow-[4px_4px_0px_0px_#000] text-[#1C2533]"
            style={{
              backgroundColor:
                activeTab === "Competition"
                  ? "#BCD5C6"
                  : activeTab === "Opportunities"
                  ? "#CFE4F3"
                  : activeTab === "Events"
                  ? "#EDBD62"
                  : "#E16E68",
              color: activeTab === "Tutoring" ? "#FFF9EF" : "#1C2533",
            }}
          >
            <div className="flex items-center justify-between mb-4 border-b border-[#1C2533]/20 pb-2">
              <span className="text-sm font-black uppercase tracking-wider">
                Upcoming:
              </span>
              <Link href="/event-list-2" className="text-xs font-black underline hover:opacity-80">
                Lihat Semua {activeTab} →
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {UPCOMING_PER_CATEGORY[activeTab]?.map((item, idx) => (
                <Link
                  key={idx}
                  href="/event-details-2"
                  className="p-4 rounded-xl bg-[#FFF9EF] text-[#1C2533] border-2 border-[#1C2533] shadow-[2px_2px_0px_0px_#1C2533] hover:-translate-y-0.5 transition-transform"
                >
                  <h4 className="text-xs font-black leading-snug">{item.title}</h4>
                  <div className="mt-2 text-[10px] text-[#597865] font-bold flex items-center justify-between">
                    <span>📅 {item.date}</span>
                    <span>📍 {item.loc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: UNIVERSITY PARTNERS EVENTS! with 4 Colored Cards */}
        <section className="bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C2533] uppercase tracking-tight">
              UNIVERSITY PARTNERS EVENTS!
            </h2>
            <p className="text-xs text-[#597865] font-bold mt-1">
              Program kolaborasi resmi bersama perguruan tinggi terkemuka
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNI_PARTNERS.map((uni) => (
              <Link
                key={uni.code}
                href="/event-details-2"
                className="p-5 rounded-xl border-2 border-[#1C2533] shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between"
                style={{ backgroundColor: uni.bg, color: uni.color }}
              >
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
      <footer className="mt-8 bg-[#FFF9EF] text-[#1C2533] border-t-2 border-[#1C2533] py-4 text-center text-xs font-bold">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
