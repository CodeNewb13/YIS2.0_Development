"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { ArrowUp, Camera, Check, X, FileText, ArrowRight } from "lucide-react";

const INTEREST_OPTIONS = [
  "Robotics & IoT",
  "Artificial Intelligence",
  "Biotechnology",
  "Renewable Energy",
  "Astrophysics",
  "Software Engineering",
  "Applied Mathematics",
  "Data Science",
];

const SKILL_OPTIONS = [
  "Python",
  "C++ / Arduino",
  "3D Modeling & CAD",
  "UI / UX Design",
  "Lab Research",
  "Scientific Writing",
  "Public Speaking",
  "Basic Electronics",
];

export default function CompleteProfilePage() {
  const router = useRouter();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Robotics & IoT",
    "Artificial Intelligence",
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Python",
    "Basic Electronics",
  ]);
  const [bio, setBio] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const toggleInterest = (val: string) => {
    setSelectedInterests((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const toggleSkill = (val: string) => {
    setSelectedSkills((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    );
  };

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("yis_signup_temp");
      const tempUser = existing ? JSON.parse(existing) : {};
      const fullProfile = {
        name: tempUser.fullName || "Alex Pratama",
        email: tempUser.email || "alex.pratama@stem.id",
        grade: tempUser.grade || "Highschool",
        institution: tempUser.institution || "SMA Negeri 1 Jakarta",
        avatar: avatarPreview || null,
        resume: resumeName || null,
        interests: selectedInterests,
        skills: selectedSkills,
        bio,
      };
      localStorage.setItem("yis_user", JSON.stringify(fullProfile));
    }
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#1C2533] text-[#FFF9EF] flex flex-col justify-between antialiased">
      {/* Header */}
      <header className="border-b border-[#FFF9EF]/15 bg-[#1C2533] px-6 py-4">
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
            <div>
              <span className="font-black text-sm md:text-base tracking-tight text-[#FFF9EF] leading-none block">
                YOUTH IN STEM
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#BCD5C6] uppercase block mt-0.5">
                Indonesia
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleFinish}
            className="text-xs font-bold text-[#BCD5C6] hover:text-[#FFF9EF] transition-colors"
          >
            Lewati Sementara →
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-[#FFF9EF] text-[#1C2533] rounded-2xl border-2 border-[#1C2533] p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]">
          {/* Header Title: COMPLETE YOUR PROFILE */}
          <div className="text-center mb-8 border-b-2 border-[#1C2533]/15 pb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1C2533] uppercase">
              COMPLETE YOUR PROFILE
            </h1>
            <p className="text-xs sm:text-sm text-[#597865] mt-1 font-bold">
              Kustomisasi profil riset, portofolio karya, dan minat sainsmu
            </p>
          </div>

          {/* Grid strictly matching wireframe 3 layout:
              Left: SET PROFILE PICTURE (Circle) + UPLOAD RESUME (Box)
              Right: INTERESTS, SKILLS, SHORT BIO */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* 1. SET PROFILE PICTURE (Circle in Sage Green #BCD5C6) */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#1C2533] mb-3">
                  SET PROFILE PICTURE
                </span>

                <div
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#BCD5C6] border-2 border-[#1C2533] flex items-center justify-center overflow-hidden cursor-pointer shadow-[3px_3px_0px_0px_#1C2533] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group relative"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Foto Profil" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-[#1C2533]">
                      <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-tight">Upload Foto</span>
                    </div>
                  )}
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              {/* 2. UPLOAD RESUME (Box in Sky Blue #CFE4F3 with up arrow) */}
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-[#1C2533] mb-2 text-center md:text-left">
                  UPLOAD RESUME
                </span>

                <div
                  onClick={() => resumeInputRef.current?.click()}
                  className="h-32 rounded-xl bg-[#CFE4F3] border-2 border-[#1C2533] p-4 flex flex-col items-center justify-center text-center cursor-pointer shadow-[3px_3px_0px_0px_#1C2533] hover:translate-x-0.5 hover:translate-y-0.5 transition-all relative group"
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="hidden"
                  />

                  {resumeName ? (
                    <div className="flex items-center gap-2 max-w-full px-2 bg-white/70 p-2 rounded border border-[#1C2533]">
                      <FileText className="w-5 h-5 text-[#4C84AB] shrink-0" />
                      <span className="text-xs font-black truncate">{resumeName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeName(null);
                        }}
                        className="text-[#D44D46] hover:bg-white p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-6 h-6 text-[#1C2533] mb-1 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-xs font-black uppercase">Pilih Berkas CV / Portofolio</span>
                      <span className="text-[10px] text-[#597865] font-bold mt-0.5">PDF, DOC (Maks. 5MB)</span>
                    </div>
                  )}

                  {/* Wireframe up arrow */}
                  <div className="absolute bottom-2.5 right-3 text-[#1C2533]">
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interests, Skills, Short Bio */}
            <div className="md:col-span-7 flex flex-col gap-5">
              {/* 3. INTERESTS (Warm Yellow #F5D494 Box) */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#1C2533] mb-1.5">
                  INTERESTS
                </span>
                <div className="rounded-xl bg-[#F5D494] border-2 border-[#1C2533] p-4 shadow-[3px_3px_0px_0px_#1C2533]">
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSel = selectedInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`text-xs font-black px-3 py-1.5 rounded-lg border-2 border-[#1C2533] transition-all flex items-center gap-1 ${
                            isSel
                              ? "bg-[#1C2533] text-[#FFF9EF]"
                              : "bg-[#FFF9EF] text-[#1C2533] hover:bg-[#FFF9EF]/80"
                          }`}
                        >
                          {isSel && <Check className="w-3.5 h-3.5" />}
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. SKILLS (Dusty Pink #E4B4C9 Box) */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#1C2533] mb-1.5">
                  SKILLS
                </span>
                <div className="rounded-xl bg-[#E4B4C9] border-2 border-[#1C2533] p-4 shadow-[3px_3px_0px_0px_#1C2533]">
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.map((item) => {
                      const isSel = selectedSkills.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleSkill(item)}
                          className={`text-xs font-black px-3 py-1.5 rounded-lg border-2 border-[#1C2533] transition-all flex items-center gap-1 ${
                            isSel
                              ? "bg-[#1C2533] text-[#FFF9EF]"
                              : "bg-[#FFF9EF] text-[#1C2533] hover:bg-[#FFF9EF]/80"
                          }`}
                        >
                          {isSel && <Check className="w-3.5 h-3.5" />}
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5. SHORT BIO (Terracotta #E16E68 Box) */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#1C2533] mb-1.5">
                  SHORT BIO
                </span>
                <div className="rounded-xl bg-[#E16E68] border-2 border-[#1C2533] p-3 shadow-[3px_3px_0px_0px_#1C2533]">
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tuliskan ketertarikan, ambisi sains, atau fokus riset kamu..."
                    className="w-full p-2.5 rounded-lg bg-[#FFF9EF] border-2 border-[#1C2533] text-[#1C2533] text-xs font-bold placeholder-[#597865]/70 focus:outline-none resize-none"
                  />
                  <div className="text-right text-[10px] font-extrabold text-[#FFF9EF] mt-1">
                    {bio.length}/200 karakter
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row strictly matching wireframe: Skip (bottom left) & Finish (bottom right) */}
          <div className="mt-8 pt-6 border-t-2 border-[#1C2533]/20 flex items-center justify-between">
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs sm:text-sm font-bold text-[#597865] hover:text-[#1C2533] underline"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-3 rounded-full bg-[#1C2533] hover:bg-[#2c3b52] active:translate-y-0.5 text-[#FFF9EF] border-2 border-[#1C2533] font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_0px_#EDBD62] hover:shadow-[1px_1px_0px_0px_#EDBD62] transition-all flex items-center gap-2"
            >
              <span>Finish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs font-bold text-[#BCD5C6]/40">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
