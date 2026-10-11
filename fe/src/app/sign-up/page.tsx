"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    grade: "Highschool",
    institution: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("yis_signup_temp", JSON.stringify(formData));
    }
    router.push("/complete-profile");
  };

  return (
    <div className="min-h-screen bg-[#1C2533] text-[#FFF9EF] flex flex-col justify-between antialiased">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#FFF9EF]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-9 shrink-0">
              <Image
                src="/YIS Logo Transparent.png"
                alt="YIS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-black text-base tracking-tight text-[#FFF9EF] uppercase">
              YIS WEBSITE NAME
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content: Clean, Normal Split-Card Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl grid md:grid-cols-12 rounded-xl overflow-hidden border-2 border-[#1C2533] bg-[#FFF9EF] shadow-lg">
          {/* Left Column: Normal, clean photo */}
          <div className="hidden md:block md:col-span-5 relative min-h-[480px]">
            <Image
              src="/visuals/coding-class.jpg"
              alt="Students learning coding"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column: Clean PERSONAL INFORMATION Form */}
          <div className="md:col-span-7 text-[#1C2533] p-8 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C2533] uppercase">
                PERSONAL INFORMATION
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Full Name
                </label>
                <div className="rounded bg-[#BCD5C6] border border-[#1C2533]">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Email
                </label>
                <div className="rounded bg-[#CFE4F3] border border-[#1C2533]">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Date of Birth
                </label>
                <div className="rounded bg-[#F5D494] border border-[#1C2533]">
                  <input
                    type="text"
                    placeholder="Ans: date/month/year"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Grade */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Grade
                </label>
                <div className="rounded bg-[#E4B4C9] border border-[#1C2533]">
                  <input
                    type="text"
                    placeholder="Ans: Highschool/University"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Institution */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Institution
                </label>
                <div className="rounded bg-[#DD9B7B] border border-[#1C2533]">
                  <input
                    type="text"
                    required
                    placeholder="Ans: Highschool Name/University Name"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Arrow Button in bottom right strictly matching wireframe */}
              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#4C84AB] hover:underline"
                >
                  Already have an account? Login
                </Link>

                <button
                  type="submit"
                  aria-label="Next"
                  className="w-11 h-11 rounded-full bg-[#1C2533] hover:bg-[#2c3b52] active:scale-95 text-[#FFF9EF] border border-[#1C2533] flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-[#BCD5C6]/40">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
