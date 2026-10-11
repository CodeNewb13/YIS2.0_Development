"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "yis_user",
          JSON.stringify({
            name: email ? email.split("@")[0].replace(/[._]/g, " ") : "Alex Pratama",
            email: email || "alex.pratama@stem.id",
            grade: "High School",
            institution: "SMA Negeri 1 Jakarta",
          })
        );
      }
      router.push("/home");
    }, 300);
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
          <div className="hidden md:block md:col-span-5 relative min-h-[460px]">
            <Image
              src="/visuals/stem-workshop.jpg"
              alt="Students in STEM workshop"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column: Clean Login Form */}
          <div className="md:col-span-7 text-[#1C2533] p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C2533] uppercase">
                USER LOGIN
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Email
                </label>
                <div className="rounded bg-[#BCD5C6] border border-[#1C2533]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3.5 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#1C2533] mb-1">
                  Password
                </label>
                <div className="relative rounded bg-[#BCD5C6] border border-[#1C2533]">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-transparent text-[#1C2533] text-sm font-semibold placeholder-[#1C2533]/40 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1C2533]/60 hover:text-[#1C2533]"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Links */}
              <div className="text-center pt-2 space-y-1">
                <div>
                  <Link
                    href="#"
                    className="text-xs font-bold text-[#4C84AB] hover:underline"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div className="text-xs font-semibold text-[#1C2533]">
                  <span>Don&apos;t have a profile yet? </span>
                  <Link
                    href="/sign-up"
                    className="text-[#4C84AB] hover:underline font-bold"
                  >
                    Create Profile
                  </Link>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-36 py-2.5 rounded-full bg-[#EDBD62] hover:bg-[#f1c779] active:translate-y-0.5 border border-[#1C2533] text-[#1C2533] font-black text-sm uppercase tracking-wider transition-colors shadow-sm"
                >
                  {loading ? "..." : "LOGIN"}
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
