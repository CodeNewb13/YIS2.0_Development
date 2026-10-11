"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { ArrowUp, Camera, Check, X } from "lucide-react";

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

export default function CompleteProfileVariant2Page() {
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
    "3D Modeling & CAD",
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
      {/* Top Header strictly matching wireframe: 'YIS WEBSITE NAME' */}
      <header className="px-6 py-5">
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
            <span className="font-black text-base sm:text-lg tracking-tight text-[#FFF9EF] uppercase">
              YIS WEBSITE NAME
            </span>
          </Link>
        </div>
      </header>

      {/* Main Container strictly following wireframe /complete-profile-2 */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-4xl p-2 sm:p-6">
          {/* Header Title strictly matching wireframe: COMPLETE YOUR PROFILE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#FFF9EF] tracking-tight uppercase">
              COMPLETE YOUR PROFILE
            </h1>
          </div>

          {/* Grid:
              Left: SET PROFILE PICTURE (Warm Yellow Circle) + UPLOAD RESUME (Warm Yellow Box)
              Right: INTERESTS, SKILLS, SHORT BIO in Soft Blue (#6E9DBE) */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* SET PROFILE PICTURE (Warm Yellow Circle #EDBD62) */}
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#FFF9EF] mb-3">
                  SET PROFILE PICTURE
                </span>

                <div
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#EDBD62] border-2 border-[#FFF9EF] flex items-center justify-center overflow-hidden cursor-pointer shadow-[3px_3px_0px_0px_#000] hover:scale-105 transition-all text-[#1C2533]"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8" />
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

              {/* UPLOAD RESUME (Warm Yellow Box #EDBD62 with up arrow) */}
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-[#FFF9EF] mb-2 text-center md:text-left">
                  UPLOAD RESUME
                </span>

                <div
                  onClick={() => resumeInputRef.current?.click()}
                  className="h-28 rounded-xl bg-[#EDBD62] text-[#1C2533] border-2 border-[#FFF9EF] p-4 flex flex-col items-center justify-center text-center cursor-pointer shadow-[3px_3px_0px_0px_#000] hover:bg-[#f1c779] transition-all relative"
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="hidden"
                  />

                  {resumeName ? (
                    <div className="flex items-center gap-2 max-w-full px-2">
                      <span className="text-xs font-bold truncate">{resumeName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeName(null);
                        }}
                        className="text-[#D44D46] hover:bg-black/10 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null}

                  <div className="absolute bottom-2.5 right-3 text-[#1C2533]">
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interests, Skills, Short Bio in Soft Blue (#6E9DBE) */}
            <div className="md:col-span-7 flex flex-col gap-5">
              {/* INTERESTS */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#FFF9EF] mb-1.5">
                  INTERESTS
                </span>
                <div className="rounded-xl bg-[#6E9DBE] border-2 border-[#FFF9EF] p-4 min-h-[90px] shadow-[3px_3px_0px_0px_#000]">
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSel = selectedInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#1C2533] transition-all flex items-center gap-1 ${
                            isSel
                              ? "bg-[#1C2533] text-[#FFF9EF]"
                              : "bg-[#FFF9EF] text-[#1C2533]"
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

              {/* SKILLS */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#FFF9EF] mb-1.5">
                  SKILLS
                </span>
                <div className="rounded-xl bg-[#6E9DBE] border-2 border-[#FFF9EF] p-4 min-h-[90px] shadow-[3px_3px_0px_0px_#000]">
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.map((item) => {
                      const isSel = selectedSkills.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleSkill(item)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#1C2533] transition-all flex items-center gap-1 ${
                            isSel
                              ? "bg-[#1C2533] text-[#FFF9EF]"
                              : "bg-[#FFF9EF] text-[#1C2533]"
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

              {/* SHORT BIO */}
              <div>
                <span className="block text-xs font-black uppercase tracking-wider text-[#FFF9EF] mb-1.5">
                  SHORT BIO
                </span>
                <div className="rounded-xl bg-[#6E9DBE] border-2 border-[#FFF9EF] p-3 shadow-[3px_3px_0px_0px_#000]">
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short bio..."
                    className="w-full p-2.5 rounded-lg bg-[#1C2533] border-2 border-[#FFF9EF]/40 text-[#FFF9EF] text-xs font-semibold focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-[#FFF9EF]/20 flex items-center justify-between">
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs sm:text-sm font-bold text-[#BCD5C6] hover:text-[#FFF9EF] underline"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-2.5 rounded-full bg-[#FFF9EF] text-[#1C2533] hover:bg-[#EDBD62] font-black text-sm uppercase tracking-wider border-2 border-[#1C2533] shadow-[2px_2px_0px_0px_#000] hover:translate-x-0.5 transition-all"
            >
              Finish
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs font-bold text-[#BCD5C6]/40">
        © 2026 Youth in STEM Indonesia
      </footer>
    </div>
  );
}
