"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, Check } from "lucide-react";

export default function EventDetailsPage() {
  const [registered, setRegistered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

          <Link
            href="/event-list-2"
            className="text-xs font-black text-[#1C2533] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Events</span>
          </Link>
        </div>
      </header>

      {/* Main Container strictly following Wireframe 4 (/event-details-2) */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 md:py-10 flex-1 space-y-6">
        {/* Wireframe Title: EVENT NAME */}
        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#EDBD62] block mb-1">
            Kompetisi Sains &amp; Robotika 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFF9EF] tracking-tight uppercase leading-tight">
            National STEM Circuit &amp; Robotics Championship
          </h1>
        </div>

        {/* 1. TOP WIDE CARD (Warm Yellow #EDBD62 strictly matching wireframe):
            - Organizer: ....
            - Activities Description: .... */}
        <div className="rounded-2xl border-2 border-[#1C2533] bg-[#EDBD62] text-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
          <div className="space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                Organizer: <span className="underline">Youth in STEM Indonesia x Teknik Elektro ITB</span>
              </h2>
            </div>
            <div className="pt-2 border-t border-[#1C2533]/20">
              <h3 className="text-base font-black uppercase tracking-tight">Activities Description:</h3>
              <p className="text-sm font-semibold mt-2 leading-relaxed">
                Kompetisi tahunan nasional bagi pelajar SMA/SMK dan mahasiswa Indonesia untuk merancang, memprogram, dan menguji purwarupa sirkuit mikrokontroler berbasis Internet of Things (IoT). Fokus kegiatan mencakup mitigasi bencana alam, efisiensi energi terbarukan, dan otomasi pertanian presisi.
              </p>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM SECTION strictly matching wireframe:
            Left: Warm Yellow Card (How to Join, Contact Person, Registration due)
            Right: 3 Picture Cards Gallery (2 on top, 1 wide on bottom) */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          {/* Bottom-Left Card (Warm Yellow #EDBD62) */}
          <div className="md:col-span-6 rounded-2xl border-2 border-[#1C2533] bg-[#EDBD62] text-[#1C2533] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
            <div className="space-y-5 text-sm font-bold">
              {/* How to Join, eligibility, etc: ... */}
              <div>
                <h3 className="text-base font-black uppercase tracking-tight">
                  How to Join, eligibility, etc:
                </h3>
                <p className="mt-1.5 font-semibold text-xs sm:text-sm leading-relaxed">
                  Terbuka untuk pelajar SMA/SMK dan mahasiswa aktif se-Indonesia. Satu tim beranggotakan 2–4 orang. Unggah proposal 5 halaman berisi skema rangkaian sirkuit dan deskripsi solusi inovasi sebelum batas akhir.
                </p>
              </div>

              {/* Contact Person: ... */}
              <div className="pt-3 border-t border-[#1C2533]/20">
                <h3 className="text-base font-black uppercase tracking-tight">Contact Person:</h3>
                <p className="mt-1 font-semibold text-xs sm:text-sm">
                  competitions@youthinstem.id &bull; +62 812-3456-7890 (Farhan)
                </p>
              </div>

              {/* Registration due: ... */}
              <div className="pt-3 border-t border-[#1C2533]/20">
                <h3 className="text-base font-black uppercase tracking-tight">Registration due:</h3>
                <p className="mt-1 font-black text-sm text-[#D44D46]">
                  20 November 2026 (23:59 WIB)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t-2 border-[#1C2533]/20 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setRegistered(!registered)}
                className={`flex-1 py-3 px-5 rounded-full font-black text-xs uppercase tracking-wider border-2 border-[#1C2533] transition-all flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#1C2533] ${
                  registered
                    ? "bg-[#597865] text-[#FFF9EF]"
                    : "bg-[#1C2533] text-[#FFF9EF] hover:bg-[#2c3b52]"
                }`}
              >
                {registered ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Tim Telah Terdaftar</span>
                  </>
                ) : (
                  <>
                    <span>Daftarkan Tim</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="py-3 px-5 rounded-full bg-[#FFF9EF] hover:bg-[#FFF9EF]/80 text-[#1C2533] font-black text-xs uppercase border-2 border-[#1C2533] flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_#1C2533]"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Tersalin" : "Bagikan"}</span>
              </button>
            </div>
          </div>

          {/* Bottom-Right Gallery (3 Pictures strictly matching wireframe: 2 on top, 1 wide on bottom) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            {/* Top row: 2 picture cards in soft pink #F6DAE4 */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="rounded-2xl border-2 border-[#1C2533] bg-[#F6DAE4] p-3 overflow-hidden shadow-[5px_5px_0px_0px_#000] relative group">
                <div className="relative h-40 sm:h-44 w-full rounded-xl overflow-hidden border-2 border-[#1C2533]">
                  <Image
                    src="/visuals/stem-circuit.jpg"
                    alt="Rangkaian Sirkuit IoT"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 text-2xl font-black text-[#FFF9EF] drop-shadow">
                    01
                  </span>
                </div>
                <p className="text-[10px] font-black text-[#1C2533] text-center mt-2 uppercase">
                  Tahap 1: Perakitan Sirkuit
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#1C2533] bg-[#F6DAE4] p-3 overflow-hidden shadow-[5px_5px_0px_0px_#000] relative group">
                <div className="relative h-40 sm:h-44 w-full rounded-xl overflow-hidden border-2 border-[#1C2533]">
                  <Image
                    src="/visuals/coding-class.jpg"
                    alt="Pemrograman Firmware"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 text-2xl font-black text-[#FFF9EF] drop-shadow">
                    02
                  </span>
                </div>
                <p className="text-[10px] font-black text-[#1C2533] text-center mt-2 uppercase">
                  Tahap 2: Firmware &amp; Logika
                </p>
              </div>
            </div>

            {/* Bottom: 1 Wide picture card in soft pink #F6DAE4 */}
            <div className="rounded-2xl border-2 border-[#1C2533] bg-[#F6DAE4] p-3 overflow-hidden shadow-[5px_5px_0px_0px_#000] flex-1 group">
              <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden border-2 border-[#1C2533]">
                <Image
                  src="/visuals/stem-workshop.jpg"
                  alt="Uji Demonstrasi di Kampus ITB"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533]/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-black text-[#FFF9EF]">
                    Tahap 3: Uji Demonstrasi &amp; Penganugerahan Juara di Aula Barat ITB
                  </span>
                </div>
                <span className="absolute top-2 left-3 text-2xl font-black text-[#FFF9EF] drop-shadow">
                  03
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-[#FFF9EF] text-[#1C2533] border-t-2 border-[#1C2533] py-4 text-center text-xs font-bold">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
