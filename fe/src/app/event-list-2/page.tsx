"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const EVENTS = [
  {
    id: "stem-circuit",
    name: "National STEM Circuit & IoT Olympiad",
    organizer: "YIS x ITB",
    date: "28 - 30 Nov 2026",
    loc: "Bandung",
    bg: "#EDBD62",
    textColor: "#1C2533",
    image: "/visuals/stem-circuit.jpg",
  },
  {
    id: "creative-coding",
    name: "AI & Creative Coding National Summit",
    organizer: "YIS Tech Lab x UI",
    date: "05 Des 2026",
    loc: "Daring",
    bg: "#F6DAE4",
    textColor: "#1C2533",
    image: "/visuals/coding-class.jpg",
  },
  {
    id: "science-lab",
    name: "Future Bio-Energy Lab Research Camp",
    organizer: "BRIN & Sains YIS",
    date: "12 - 15 Jan 2027",
    loc: "Jakarta",
    bg: "#D44D46",
    textColor: "#FFF9EF",
    image: "/visuals/science-lab.jpg",
  },
  {
    id: "stem-workshop",
    name: "Youth Innovation & Maker Faire Expo",
    organizer: "Inovasi UGM",
    date: "18 - 20 Des 2026",
    loc: "Yogyakarta",
    bg: "#CFB4E4",
    textColor: "#1C2533",
    image: "/visuals/stem-workshop.jpg",
  },
  {
    id: "olympiad-prep",
    name: "Pelatihan Intensif Fisika Lanjutan",
    organizer: "Alumni OSN",
    date: "Tiap Akhir Pekan",
    loc: "Daring",
    bg: "#BCD5C6",
    textColor: "#1C2533",
  },
  {
    id: "mentorship-circle",
    name: "Mentoring Riset & Beasiswa Global",
    organizer: "Alumni NTU & NUS",
    date: "Pendaftaran Buka",
    loc: "1-on-1",
    bg: "#CFE4F3",
    textColor: "#1C2533",
  },
];

export default function EventListBentoPage() {
  return (
    <div className="min-h-screen bg-[#1C2533] text-[#FFF9EF] flex flex-col antialiased">
      {/* Header */}
      <header className="bg-[#FFF9EF] border-b-2 border-[#1C2533] px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-9">
              <Image src="/YIS Logo Transparent.png" alt="YIS Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="font-black text-sm md:text-base tracking-tight text-[#1C2533] uppercase leading-none block">
                YIS WEBSITE NAME
              </span>
              <span className="text-[9px] font-bold tracking-[0.18em] text-[#597865] uppercase block mt-0.5">
                Youth in STEM Indonesia
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-5 text-xs font-black text-[#1C2533] uppercase">
            <Link href="/home" className="hover:text-[#4C84AB]">Home</Link>
            <Link href="/page" className="hover:text-[#4C84AB]">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area strictly matching Wireframe 3 Bento Grid */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12 flex-1 space-y-8">
        {/* Wireframe Header: CHECK OUT THESE EVENTS! */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-[#FFF9EF] tracking-tight uppercase">
            CHECK OUT THESE EVENTS!
          </h1>
          <p className="text-xs sm:text-sm text-[#BCD5C6] font-semibold mt-1">
            Daftar kompetisi, hackathon, lab camp, dan expo sains terpopuler
          </p>
        </div>

        {/* BENTO GRID STRICTLY MATCHING WIREFRAME 3:
            - Top-Left: Yellow Card with Name + Picture box
            - Top-Right: Soft Pink Card
            - Bottom-Left: Tall Coral Card
            - Bottom-Center: Tall Purple Card
            - Bottom-Right: Two Stacked Cards (Sage + Blue) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Top-Left (Yellow Card #EDBD62 with Name + Picture) */}
          <Link
            href="/event-details-2"
            className="md:col-span-5 rounded-2xl border-2 border-[#1C2533] p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
            style={{ backgroundColor: EVENTS[0].bg, color: EVENTS[0].textColor }}
          >
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                {EVENTS[0].organizer} &bull; {EVENTS[0].loc}
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight mt-0.5 leading-snug">
                {EVENTS[0].name}
              </h2>
            </div>

            {/* Picture Box */}
            <div className="relative h-44 w-full rounded-xl bg-[#FFF9EF] border-2 border-[#1C2533] overflow-hidden">
              <Image
                src={EVENTS[0].image!}
                alt="Picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533]/80 via-transparent to-transparent flex items-end justify-between p-3">
                <span className="text-xs font-black text-[#FFF9EF]">📅 {EVENTS[0].date}</span>
                <span className="text-xs font-black text-[#EDBD62] flex items-center gap-1">
                  Detail <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2: Top-Right (Soft Pink Card #F6DAE4) */}
          <Link
            href="/event-details-2"
            className="md:col-span-7 rounded-2xl border-2 border-[#1C2533] p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
            style={{ backgroundColor: EVENTS[1].bg, color: EVENTS[1].textColor }}
          >
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                {EVENTS[1].organizer} &bull; {EVENTS[1].loc}
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight mt-0.5 leading-snug">
                {EVENTS[1].name}
              </h2>
            </div>

            <div className="relative h-44 w-full rounded-xl bg-[#FFF9EF] border-2 border-[#1C2533] overflow-hidden">
              <Image
                src={EVENTS[1].image!}
                alt="Picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533]/80 via-transparent to-transparent flex items-end justify-between p-3">
                <span className="text-xs font-black text-[#FFF9EF]">📅 {EVENTS[1].date}</span>
                <span className="text-xs font-black text-[#1C2533] bg-[#F6DAE4] px-2 py-0.5 rounded font-black flex items-center gap-1">
                  Detail <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 3: Bottom-Left (Tall Coral Card #D44D46) */}
          <Link
            href="/event-details-2"
            className="md:col-span-4 rounded-2xl border-2 border-[#1C2533] p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group min-h-[320px]"
            style={{ backgroundColor: EVENTS[2].bg, color: EVENTS[2].textColor }}
          >
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-85">
                {EVENTS[2].organizer}
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight mt-0.5 leading-snug">
                {EVENTS[2].name}
              </h2>
            </div>

            <div className="relative h-52 w-full rounded-xl bg-[#FFF9EF] border-2 border-[#1C2533] overflow-hidden my-2">
              <Image
                src={EVENTS[2].image!}
                alt="Picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-black">
              <span>📅 {EVENTS[2].date}</span>
              <span>Daftar →</span>
            </div>
          </Link>

          {/* Card 4: Bottom-Center (Tall Purple Card #CFB4E4) */}
          <Link
            href="/event-details-2"
            className="md:col-span-4 rounded-2xl border-2 border-[#1C2533] p-5 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group min-h-[320px]"
            style={{ backgroundColor: EVENTS[3].bg, color: EVENTS[3].textColor }}
          >
            <div className="mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                {EVENTS[3].organizer}
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight mt-0.5 leading-snug">
                {EVENTS[3].name}
              </h2>
            </div>

            <div className="relative h-52 w-full rounded-xl bg-[#FFF9EF] border-2 border-[#1C2533] overflow-hidden my-2">
              <Image
                src={EVENTS[3].image!}
                alt="Picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="pt-2 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
              <span>📍 {EVENTS[3].loc}</span>
              <span>RSVP →</span>
            </div>
          </Link>

          {/* Card 5 & 6: Bottom-Right (Two Stacked Cards: Sage Green + Soft Blue) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Upper: Sage Green Card #BCD5C6 */}
            <Link
              href="/event-details-2"
              className="rounded-2xl border-2 border-[#1C2533] p-5 flex-1 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 transition-all group min-h-[145px]"
              style={{ backgroundColor: EVENTS[4].bg, color: EVENTS[4].textColor }}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                  {EVENTS[4].organizer}
                </span>
                <h3 className="text-base font-black uppercase tracking-tight mt-0.5 leading-snug">
                  {EVENTS[4].name}
                </h3>
              </div>
              <div className="pt-2 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                <span>📅 {EVENTS[4].date}</span>
                <span>Ikuti →</span>
              </div>
            </Link>

            {/* Lower: Soft Blue Card #CFE4F3 */}
            <Link
              href="/event-details-2"
              className="rounded-2xl border-2 border-[#1C2533] p-5 flex-1 flex flex-col justify-between shadow-[5px_5px_0px_0px_#000] hover:translate-x-0.5 transition-all group min-h-[145px]"
              style={{ backgroundColor: EVENTS[5].bg, color: EVENTS[5].textColor }}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                  {EVENTS[5].organizer}
                </span>
                <h3 className="text-base font-black uppercase tracking-tight mt-0.5 leading-snug">
                  {EVENTS[5].name}
                </h3>
              </div>
              <div className="pt-2 border-t border-[#1C2533]/20 flex items-center justify-between text-xs font-black">
                <span>🎯 {EVENTS[5].loc}</span>
                <span>Buka →</span>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-[#FFF9EF] text-[#1C2533] border-t-2 border-[#1C2533] py-4 text-center text-xs font-bold">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
